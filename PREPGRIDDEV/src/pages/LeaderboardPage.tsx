import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { leaderboard } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import {
  Trophy,
  Medal,
  Users,
  TrendingUp,
  Target,
  Star,
  Crown
} from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('All');

  const topics = ['All', 'React Hooks', 'DBMS Normalization', 'OS Scheduling'];

  const filteredLeaderboard = leaderboard
    .filter(entry => selectedTopic === 'All' || entry.topic === selectedTopic)
    .sort((a, b) => b.score - a.score);

  const userRank = filteredLeaderboard.findIndex(entry => entry.userId === user?.id) + 1;
  const userScore = filteredLeaderboard.find(entry => entry.userId === user?.id)?.score;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 2:
        return 'bg-gray-400/10 border-gray-400/30';
      case 3:
        return 'bg-orange-400/10 border-orange-400/30';
      default:
        return 'bg-muted';
    }
  };

  const stats = [
    {
      title: 'Total Participants',
      value: '2,456',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Tests Completed',
      value: '12,834',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Avg Score',
      value: '72%',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Top Score',
      value: '98%',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank against other learners
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

        {user && userRank > 0 && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    {userRank}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Your Rank</p>
                    <p className="text-sm text-muted-foreground">
                      You're in the top {Math.round((userRank / filteredLeaderboard.length) * 100)}%!
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{userScore}%</p>
                  <p className="text-sm text-muted-foreground">Your Best Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Performers
              </CardTitle>
              <Tabs value={selectedTopic} onValueChange={setSelectedTopic}>
                <TabsList>
                  {topics.map(topic => (
                    <TabsTrigger key={topic} value={topic}>
                      {topic === 'All' ? 'All Topics' : topic}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLeaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${getRankStyle(index + 1)}`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-semibold">{entry.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {entry.topic}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      entry.score >= 90 ? 'text-green-600' :
                      entry.score >= 70 ? 'text-yellow-600' :
                      'text-orange-600'
                    }`}>
                      {entry.score}%
                    </p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredLeaderboard.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No entries yet for this topic</p>
                <p className="text-sm text-muted-foreground">
                  Be the first to take a test!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
