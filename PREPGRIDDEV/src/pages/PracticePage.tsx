import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { codingQuestions } from '@/data/mockData';
import type { Difficulty, Topic } from '@/types';
import {
  Search,
  BookOpen,
  CheckCircle,
  Bookmark,
  Filter,
  Code2,
  Clock,
  BarChart3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PracticePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);

  const topics: Topic[] = ['Arrays', 'Strings', 'Trees', 'DP', 'Graphs', 'SQL'];

  const filteredQuestions = useMemo(() => {
    return codingQuestions.filter(question => {
      const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          question.topic.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(question.topic);
      const matchesBookmarked = !showBookmarked || user?.bookmarkedQuestions.includes(question.id);

      return matchesSearch && matchesDifficulty && matchesTopic && matchesBookmarked;
    });
  }, [searchQuery, selectedDifficulty, selectedTopics, showBookmarked, user?.bookmarkedQuestions]);

  const toggleBookmark = (questionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;

    const isBookmarked = user.bookmarkedQuestions.includes(questionId);
    const updatedBookmarks = isBookmarked
      ? user.bookmarkedQuestions.filter(id => id !== questionId)
      : [...user.bookmarkedQuestions, questionId];

    updateUser({ bookmarkedQuestions: updatedBookmarks });
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-600 hover:bg-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20';
      case 'Hard': return 'bg-red-500/10 text-red-600 hover:bg-red-500/20';
    }
  };

  const solvedCount = user?.solvedQuestions.length || 0;
  const totalCount = codingQuestions.length;
  const easyCount = codingQuestions.filter(q => q.difficulty === 'Easy').length;
  const mediumCount = codingQuestions.filter(q => q.difficulty === 'Medium').length;
  const hardCount = codingQuestions.filter(q => q.difficulty === 'Hard').length;

  const easySolved = user?.solvedQuestions.filter(id => 
    codingQuestions.find(q => q.id === id)?.difficulty === 'Easy'
  ).length || 0;
  const mediumSolved = user?.solvedQuestions.filter(id => 
    codingQuestions.find(q => q.id === id)?.difficulty === 'Medium'
  ).length || 0;
  const hardSolved = user?.solvedQuestions.filter(id => 
    codingQuestions.find(q => q.id === id)?.difficulty === 'Hard'
  ).length || 0;

  return (
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
          <p className="text-muted-foreground">
            Solve coding problems to improve your skills
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Solved</p>
                  <p className="text-2xl font-bold">{solvedCount}/{totalCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Easy</p>
                  <p className="text-2xl font-bold text-green-600">{easySolved}/{easyCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Medium</p>
                  <p className="text-2xl font-bold text-yellow-600">{mediumSolved}/{mediumCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <BarChart3 className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hard</p>
                  <p className="text-2xl font-bold text-red-600">{hardSolved}/{hardCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10">
                  <Code2 className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={selectedDifficulty} onValueChange={(v) => setSelectedDifficulty(v as Difficulty | 'All')}>
                <TabsList>
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Easy">Easy</TabsTrigger>
                  <TabsTrigger value="Medium">Medium</TabsTrigger>
                  <TabsTrigger value="Hard">Hard</TabsTrigger>
                </TabsList>
              </Tabs>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Topics
                    {selectedTopics.length > 0 && (
                      <Badge variant="secondary" className="ml-1">{selectedTopics.length}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {topics.map((topic) => (
                    <DropdownMenuCheckboxItem
                      key={topic}
                      checked={selectedTopics.includes(topic)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTopics([...selectedTopics, topic]);
                        } else {
                          setSelectedTopics(selectedTopics.filter(t => t !== topic));
                        }
                      }}
                    >
                      {topic}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant={showBookmarked ? 'default' : 'outline'}
                onClick={() => setShowBookmarked(!showBookmarked)}
                className="gap-2"
              >
                <Bookmark className="h-4 w-4" />
                Bookmarked
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredQuestions.map((question) => {
            const isSolved = user?.solvedQuestions.includes(question.id);
            const isBookmarked = user?.bookmarkedQuestions.includes(question.id);

            return (
              <Link key={question.id} to={`/practice/${question.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {question.title}
                          </h3>
                          {isSolved && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {question.description.substring(0, 150)}...
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">{question.topic}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {question.timeComplexity}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => toggleBookmark(question.id, e)}
                          className={isBookmarked ? 'text-yellow-500' : ''}
                        >
                          <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                        </Button>
                        <Button variant="outline" size="sm">
                          Solve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No questions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticePage;
