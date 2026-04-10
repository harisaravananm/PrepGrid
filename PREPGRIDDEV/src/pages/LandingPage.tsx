import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Code2, 
  MessageSquare, 
  Trophy, 
  Zap, 
  Shield, 
  BarChart3,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Code2 className="h-8 w-8 text-primary" />,
      title: 'Coding Practice',
      description: '500+ coding questions across Arrays, Strings, Trees, DP, Graphs, and more with in-browser code editor.'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: 'AI Mock Interviews',
      description: 'Practice with AI-powered interviews tailored to Frontend, Backend, Full Stack, and DSA roles.'
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: 'Timed Tests & Leaderboard',
      description: 'Take timed MCQ tests and compete with others on the global leaderboard.'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Personalized Feedback',
      description: 'Get instant AI-powered feedback on your answers with improvement suggestions.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Progress Tracking',
      description: 'Track your solved questions, interview attempts, and maintain your daily streak.'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: 'Performance Analytics',
      description: 'Identify your weak areas and focus on improving them with detailed analytics.'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Software Engineer at Google',
      content: 'PrepGrid helped me crack my Google interview. The AI mock interviews were incredibly realistic!',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Frontend Developer at Meta',
      content: 'The coding questions and in-browser editor made practice so convenient. Highly recommended!',
      rating: 5
    },
    {
      name: 'Amit Kumar',
      role: 'Full Stack Developer at Amazon',
      content: 'Best platform for interview preparation. The personalized feedback really helped me improve.',
      rating: 5
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '500+', label: 'Coding Questions' },
    { value: '50,000+', label: 'Interviews Conducted' },
    { value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PrepGrid</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Star className="h-4 w-4" />
            <span>Trusted by 10,000+ engineers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Master Your Technical Interviews with{' '}
            <span className="text-primary">AI-Powered</span> Practice
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Prepare for your dream job with coding challenges, AI mock interviews, and personalized feedback. 
            Join thousands of engineers who have landed jobs at top tech companies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Start Practicing Free
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed to help you ace your technical interviews
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from engineers who have successfully landed their dream jobs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of engineers preparing for their dream jobs. Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Create Free Account
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">PrepGrid</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PrepGrid. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
