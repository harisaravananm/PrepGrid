import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { codingQuestions } from '@/data/mockData';
import {
  Calendar,
  Trophy,
  Flame,
  BookOpen,
  MessageSquare,
  Edit2,
  Save,
  Crown,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    updateUser({ name });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const solvedCount = user?.solvedQuestions.length || 0;
  const totalQuestions = codingQuestions.length;
  const interviewCount = user?.interviewHistory.length || 0;
  const testCount = user?.testHistory.length || 0;

  const topicStats = codingQuestions.reduce((acc, q) => {
    if (user?.solvedQuestions.includes(q.id)) {
      acc[q.topic] = (acc[q.topic] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const difficultyStats = {
    Easy: user?.solvedQuestions.filter(id => 
      codingQuestions.find(q => q.id === id)?.difficulty === 'Easy'
    ).length || 0,
    Medium: user?.solvedQuestions.filter(id => 
      codingQuestions.find(q => q.id === id)?.difficulty === 'Medium'
    ).length || 0,
    Hard: user?.solvedQuestions.filter(id => 
      codingQuestions.find(q => q.id === id)?.difficulty === 'Hard'
    ).length || 0
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and view your progress
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing ? (
                    <div className="w-full mb-4">
                      <Label htmlFor="name" className="sr-only">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-center"
                      />
                    </div>
                  ) : (
                    <h2 className="text-xl font-semibold mb-1">{user?.name}</h2>
                  )}
                  
                  <p className="text-muted-foreground mb-4">{user?.email}</p>
                  
                  <div className="flex items-center gap-2 mb-6">
                    {user?.plan === 'Pro' ? (
                      <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
                        <Crown className="h-3 w-3 mr-1" />
                        Pro Plan
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Free Plan</Badge>
                    )}
                  </div>

                  {isEditing ? (
                    <Button onClick={handleSave} className="w-full gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full gap-2">
                      <Edit2 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <Flame className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Streak</p>
                      <p className="font-medium">{user?.streak || 0} days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <BookOpen className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Questions Solved</p>
                      <p className="font-medium">{solvedCount}/{totalQuestions}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Interviews Taken</p>
                      <p className="font-medium">{interviewCount}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tests Completed</p>
                      <p className="font-medium">{testCount}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Solving Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{difficultyStats.Easy}</div>
                    <div className="text-sm text-muted-foreground">Easy</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">{difficultyStats.Medium}</div>
                    <div className="text-sm text-muted-foreground">Medium</div>
                  </div>
                  <div className="text-center p-4 bg-red-500/10 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">{difficultyStats.Hard}</div>
                    <div className="text-sm text-muted-foreground">Hard</div>
                  </div>
                </div>

                <h3 className="font-semibold mb-4">Topics Mastered</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(topicStats).length > 0 ? (
                    Object.entries(topicStats).map(([topic, count]) => (
                      <Badge key={topic} variant="secondary" className="text-sm py-1 px-3">
                        {topic}: {count}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Start solving questions to see your topic stats!</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user?.interviewHistory?.slice(-3).reverse().map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <MessageSquare className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <p className="font-medium">AI Interview - {interview.role}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(interview.startedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        interview.totalScore >= 80 ? 'bg-green-500/10 text-green-600' :
                        interview.totalScore >= 60 ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-red-500/10 text-red-600'
                      }>
                        {interview.totalScore}%
                      </Badge>
                    </div>
                  ))}

                  {user?.testHistory?.slice(-3).reverse().map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-yellow-500/10">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div>
                          <p className="font-medium">Test - {test.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(test.startedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        test.score >= 80 ? 'bg-green-500/10 text-green-600' :
                        test.score >= 60 ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-red-500/10 text-red-600'
                      }>
                        {test.score}%
                      </Badge>
                    </div>
                  ))}

                  {(!user?.interviewHistory?.length && !user?.testHistory?.length) && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No recent activity</p>
                      <p className="text-sm">Start practicing to see your progress!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {user?.plan === 'Free' && (
              <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Upgrade to Pro</h3>
                        <p className="text-sm text-muted-foreground">
                          Get unlimited AI interviews and practice questions
                        </p>
                      </div>
                    </div>
                    <Button>Upgrade Now</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
