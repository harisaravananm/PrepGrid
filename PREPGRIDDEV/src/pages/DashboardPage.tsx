import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { codingQuestions } from '@/data/mockData';
import {
  BookOpen,
  MessageSquare,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Clock,
  ChevronRight,
  Zap,
  Crown
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const solvedCount = user?.solvedQuestions.length || 0;
  const totalQuestions = codingQuestions.length;
  const solvedPercentage = Math.round((solvedCount / totalQuestions) * 100);

  const easySolved = user?.solvedQuestions.filter(id => 
    codingQuestions.find(q => q.id === id)?.difficulty === 'Easy'
  ).length || 0;
  const mediumSolved = user?.solvedQuestions.filter(id => 
    codingQuestions.find(q => q.id === id)?.difficulty === 'Medium'
  ).length || 0;
  const hardSolved = user?.solvedQuestions.filter(id => 
    codingQuestions.find(q => q.id === id)?.difficulty === 'Hard'
  ).length || 0;

  const stats = [
    {
      title: 'Questions Solved',
      value: solvedCount,
      total: totalQuestions,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      link: '/practice'
    },
    {
      title: 'AI Interviews',
      value: user?.interviewHistory.length || 0,
      icon: MessageSquare,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      link: '/interview'
    },
    {
      title: 'Tests Taken',
      value: user?.testHistory.length || 0,
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      link: '/test'
    },
    {
      title: 'Current Streak',
      value: `${user?.streak || 0} days`,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      link: '/practice'
    }
  ];

  const recentActivity = [
    ...(user?.interviewHistory.slice(-3).map(i => ({
      type: 'interview' as const,
      title: `AI Interview - ${i.role}`,
      date: new Date(i.startedAt),
      score: i.totalScore
    })) || []),
    ...(user?.testHistory.slice(-3).map(t => ({
      type: 'test' as const,
      title: `Test - ${t.topic}`,
      date: new Date(t.startedAt),
      score: t.score
    })) || [])
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Here's your progress and activities for today.
          </p>
        </div>

        {user?.plan === 'Free' && (
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Crown className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Upgrade to Pro</h3>
                    <p className="text-sm text-muted-foreground">
                      Get unlimited AI interviews and practice questions
                    </p>
                  </div>
                </div>
                <Link to="/billing">
                  <Button className="gap-2">
                    <Zap className="h-4 w-4" />
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Link key={index} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">{stat.value}</span>
                        {stat.total && (
                          <span className="text-sm text-muted-foreground">/ {stat.total}</span>
                        )}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Solving Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{solvedPercentage}%</span>
                    </div>
                    <Progress value={solvedPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{easySolved}</div>
                      <div className="text-sm text-muted-foreground">Easy</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{mediumSolved}</div>
                      <div className="text-sm text-muted-foreground">Medium</div>
                    </div>
                    <div className="text-center p-4 bg-red-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{hardSolved}</div>
                      <div className="text-sm text-muted-foreground">Hard</div>
                    </div>
                  </div>

                  <Link to="/practice">
                    <Button className="w-full gap-2">
                      Continue Practicing
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            activity.type === 'interview' ? 'bg-purple-500/10' : 'bg-yellow-500/10'
                          }`}>
                            {activity.type === 'interview' ? (
                              <MessageSquare className="h-4 w-4 text-purple-500" />
                            ) : (
                              <Trophy className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.date.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        {activity.score !== undefined && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{activity.score}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No recent activity</p>
                    <p className="text-sm">Start practicing to see your progress!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/practice">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <BookOpen className="h-4 w-4" />
                      Start Coding Practice
                    </Button>
                  </Link>
                  <Link to="/interview">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Take AI Interview
                    </Button>
                  </Link>
                  <Link to="/test">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Trophy className="h-4 w-4" />
                      Attempt a Test
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">AI Interviews</span>
                      <span className="text-sm text-muted-foreground">
                        {user?.plan === 'Pro' ? 'Unlimited' : `${user?.interviewsRemaining}/5 remaining`}
                      </span>
                    </div>
                    {user?.plan === 'Free' && (
                      <Progress 
                        value={(user?.interviewsRemaining || 0) * 20} 
                        className="h-2" 
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Practice Questions</span>
                      <span className="text-sm text-muted-foreground">
                        {user?.plan === 'Pro' ? 'Unlimited' : `${user?.questionsRemaining}/10 remaining`}
                      </span>
                    </div>
                    {user?.plan === 'Free' && (
                      <Progress 
                        value={(user?.questionsRemaining || 0) * 10} 
                        className="h-2" 
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
