import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { adminAnalytics, codingQuestions, mockUsers } from '@/data/mockData';
import type { Difficulty } from '@/types';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  BookOpen,
  TrendingUp,
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  Search,
  Activity,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

const AdminPage: React.FC = () => {
  const [questions, setQuestions] = useState(codingQuestions);
  const [users] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setEditingQuestion] = useState<typeof codingQuestions[0] | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success('Question deleted successfully');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Question saved successfully');
    setIsAddDialogOpen(false);
    setEditingQuestion(null);
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-600';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600';
      case 'Hard': return 'bg-red-500/10 text-red-600';
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: adminAnalytics.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Active Users',
      value: adminAnalytics.activeUsers.toLocaleString(),
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Total Questions',
      value: adminAnalytics.totalQuestions.toString(),
      icon: BookOpen,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Avg Score',
      value: '68%',
      icon: Target,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage questions, users, and view analytics
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Question Bank</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Add New Question</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-4">
                          <div>
                            <Label>Title</Label>
                            <Input placeholder="Question title" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Difficulty</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Easy">Easy</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="Hard">Hard</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Topic</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select topic" />
                                </SelectTrigger>
                                <SelectContent>
                                  {['Arrays', 'Strings', 'Trees', 'DP', 'Graphs', 'SQL'].map(t => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea placeholder="Problem description" rows={4} required />
                          </div>
                          <div>
                            <Label>Starter Code (JavaScript)</Label>
                            <Textarea placeholder="function solution() {...}" rows={4} />
                          </div>
                          <Button type="submit" className="w-full">Save Question</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredQuestions.map((question) => (
                    <div key={question.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{question.title}</h3>
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">{question.topic}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {question.description.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="icon" onClick={() => setEditingQuestion(question)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(question.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Questions Solved</p>
                          <p className="font-medium">{user.solvedQuestions.length}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Interviews</p>
                          <p className="font-medium">{user.interviewHistory.length}</p>
                        </div>
                        <Badge className={user.plan === 'Pro' ? 'bg-yellow-500/10 text-yellow-600' : ''}>
                          {user.plan}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Most Attempted Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminAnalytics.mostAttemptedQuestions.map((q, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{q.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={(q.attempts / 6000) * 100} className="h-2 flex-1" />
                            <span className="text-sm text-muted-foreground w-16 text-right">
                              {q.attempts.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Average Scores by Topic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminAnalytics.averageScoresByTopic.map((topic, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-24">
                          <p className="font-medium text-sm">{topic.topic}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Progress value={topic.averageScore} className="h-2 flex-1" />
                            <span className={`text-sm font-medium w-12 text-right ${
                              topic.averageScore >= 70 ? 'text-green-600' :
                              topic.averageScore >= 50 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {topic.averageScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Daily Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 h-48">
                    {adminAnalytics.dailyActiveUsers.map((day, index) => {
                      const maxCount = Math.max(...adminAnalytics.dailyActiveUsers.map(d => d.count));
                      const height = (day.count / maxCount) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-primary/20 rounded-t hover:bg-primary/30 transition-colors relative group"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {day.count} users
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
