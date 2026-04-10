import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import {
  Check,
  X,
  Crown,
  Zap,
  CreditCard,
  Calendar,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const BillingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, upgradeToPro } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      current: user?.plan === 'Free',
      features: [
        { text: '5 AI interviews per month', included: true },
        { text: '10 practice questions', included: true },
        { text: 'Basic progress tracking', included: true },
        { text: 'Community leaderboard', included: true },
        { text: 'Unlimited AI interviews', included: false },
        { text: 'Unlimited practice questions', included: false },
        { text: 'Detailed analytics', included: false },
        { text: 'Priority support', included: false }
      ]
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 999 : 799,
      period: billingCycle === 'monthly' ? 'per month' : 'per month, billed annually',
      description: 'For serious interview preparation',
      current: user?.plan === 'Pro',
      popular: true,
      features: [
        { text: 'Unlimited AI interviews', included: true },
        { text: 'Unlimited practice questions', included: true },
        { text: 'Advanced progress tracking', included: true },
        { text: 'Priority leaderboard', included: true },
        { text: 'Detailed performance analytics', included: true },
        { text: 'Personalized study plans', included: true },
        { text: 'Mock interview recordings', included: true },
        { text: '24/7 priority support', included: true }
      ]
    }
  ];

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async () => {
    setIsProcessing(true);

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    const price = billingCycle === 'monthly' ? 999 : 799;

    const options = {
      key: 'rzp_test_YOUR_KEY_HERE', // Please enter your actual Test Key generated from Razorpay Dashboard
      amount: price * 100, // Amount in paise
      currency: 'INR',
      name: 'PrepGrid',
      description: 'PrepGrid Pro Subscription',
      handler: function (_response: any) {
        setIsProcessing(false);
        upgradeToPro();
        setShowSuccess(true);
        toast.success('Successfully upgraded to Pro!');
      },
      prefill: {
        name: user?.name || 'Test User',
        email: user?.email || 'test@example.com',
      },
      theme: {
        color: '#f59e0b', // Yellow/Gold theme of PrepGrid Pro
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    // @ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <CardContent>
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome to Pro!</h1>
              <p className="text-muted-foreground mb-6">
                Your subscription has been activated successfully. You now have unlimited access to all features!
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={() => setShowSuccess(false)}>
                  View Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Billing & Plans</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing history
          </p>
        </div>

        {user?.plan === 'Pro' && (
          <Card className="mb-8 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-yellow-500/20">
                    <Crown className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Pro Plan Active</h3>
                    <p className="text-sm text-muted-foreground">
                      You have unlimited access to all features
                    </p>
                  </div>
                </div>
                <Badge className="bg-yellow-500/10 text-yellow-600">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 bg-muted p-2 rounded-lg">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === 'yearly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
            />
            <span className={`text-sm ${billingCycle === 'yearly' ? 'font-medium' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge variant="secondary" className="text-xs">Save 20%</Badge>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Zap className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {plan.current && (
                    <Badge variant="secondary">Current Plan</Badge>
                  )}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? 'Free' : formatPrice(plan.price)}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <Separator className="mb-6" />
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-500" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                          <X className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.name === 'Pro' && !plan.current && (
                  <Button 
                    className="w-full mt-6" 
                    onClick={handleUpgrade}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Pro
                      </>
                    )}
                  </Button>
                )}

                {plan.current && (
                  <Button className="w-full mt-6" variant="outline" disabled>
                    Current Plan
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user?.billingHistory && user.billingHistory.length > 0 ? (
              <div className="space-y-4">
                {user.billingHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{record.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(record.amount)}</p>
                      <Badge className={
                        record.status === 'success' ? 'bg-green-500/10 text-green-600' :
                        record.status === 'pending' ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-red-500/10 text-red-600'
                      }>
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No billing history yet</p>
                <p className="text-sm text-muted-foreground">
                  Your transactions will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingPage;
