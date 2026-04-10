import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { testQuestions, leaderboard } from '@/data/mockData';
import type { TestSession, TestQuestion } from '@/types';
import {
  Trophy,
  Clock,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Target,
  TrendingUp,
  Users,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const topics = [
    { id: 'React Hooks', name: 'React Hooks', questions: 3, time: 10 },
    { id: 'DBMS Normalization', name: 'DBMS Normalization', questions: 3, time: 10 },
    { id: 'OS Scheduling', name: 'OS Scheduling', questions: 3, time: 10 }
  ];

  useEffect(() => {
    if (session && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [session, timeLeft, showResults]);

  const startTest = (topicId: string) => {
    setSelectedTopic(topicId);
    
    const questions = testQuestions[topicId] || [];
    const testQuestionsFormatted: TestQuestion[] = questions.map((q, index) => ({
      id: `q${index}`,
      question: q.question,
      type: q.type as 'mcq' | 'short_answer',
      options: q.options,
      correctAnswer: q.correctAnswer,
      marks: q.marks,
      explanation: q.explanation
    }));

    const topic = topics.find(t => t.id === topicId);
    
    const newSession: TestSession = {
      id: Date.now().toString(),
      topic: topicId,
      startedAt: new Date(),
      questions: testQuestionsFormatted,
      score: 0,
      totalQuestions: testQuestionsFormatted.length,
      correctAnswers: 0,
      timeLimit: (topic?.time || 10) * 60,
      timeTaken: 0
    };

    setSession(newSession);
    setTimeLeft((topic?.time || 10) * 60);
    setCurrentAnswer('');
  };

  const submitAnswer = () => {
    if (!session) return;

    const currentQuestion = session.questions[0];

    if (currentQuestion.type === 'mcq') {
      currentAnswer === currentQuestion.correctAnswer;
    } else {
      currentAnswer.toLowerCase().includes(currentQuestion.correctAnswer?.toLowerCase() || '');
    }

    const updatedQuestions = [...session.questions];
    updatedQuestions[0] = { ...currentQuestion, userAnswer: currentAnswer };

    if (updatedQuestions.length > 1) {
      setSession({
        ...session,
        questions: updatedQuestions.slice(1)
      });
      setCurrentAnswer('');
    } else {
      finishTest(updatedQuestions);
    }
  };

  const finishTest = (finalQuestions?: TestQuestion[]) => {
    if (!session) return;

    const allQuestions = finalQuestions || session.questions;
    const timeTaken = session.timeLimit - timeLeft;
    
    let correctCount = 0;
    let totalScore = 0;

    allQuestions.forEach(q => {
      if (q.type === 'mcq') {
        if (q.userAnswer === q.correctAnswer) {
          correctCount++;
          totalScore += q.marks;
        }
      } else {
        if (q.userAnswer?.toLowerCase().includes(q.correctAnswer?.toLowerCase() || '')) {
          correctCount++;
          totalScore += q.marks;
        }
      }
    });

    const maxScore = allQuestions.reduce((sum, q) => sum + q.marks, 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    const completedSession: TestSession = {
      ...session,
      questions: allQuestions,
      score: percentage,
      correctAnswers: correctCount,
      completedAt: new Date(),
      timeTaken
    };

    setSession(completedSession);
    setShowResults(true);

    if (user) {
      updateUser({
        testHistory: [...(user.testHistory || []), completedSession]
      });
    }

    toast.success('Test completed! Check your results.');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTest = () => {
    setSelectedTopic(null);
    setSession(null);
    setCurrentAnswer('');
    setShowResults(false);
    setTimeLeft(0);
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Timed Tests</h1>
            <p className="text-muted-foreground">
              Test your knowledge with timed MCQ tests and compete on the leaderboard
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {topics.map((topic) => (
              <Card
                key={topic.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => startTest(topic.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline">{topic.time} mins</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {topic.questions} questions • Multiple choice & short answer
                  </p>
                  <Button className="w-full">
                    Start Test
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 10)
                  .map((entry, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index < 3 ? 'bg-yellow-500/5' : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-400 text-white' :
                          'bg-muted-foreground/20'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{entry.name}</p>
                          <p className="text-sm text-muted-foreground">{entry.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{entry.score}%</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults && session) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
              <p className="text-muted-foreground mb-6">
                Here's how you performed in {session.topic}
              </p>
              
              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${
                    session.score >= 80 ? 'text-green-600' :
                    session.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {session.score}%
                  </div>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{session.correctAnswers}/{session.totalQuestions}</div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {Math.floor(session.timeTaken / 60)}m {session.timeTaken % 60}s
                  </div>
                  <p className="text-sm text-muted-foreground">Time Taken</p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={resetTest}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Another Test
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Answer Review</h2>
          <div className="space-y-4">
            {session.questions.map((q, index) => {
              const isCorrect = q.type === 'mcq' 
                ? q.userAnswer === q.correctAnswer
                : q.userAnswer?.toLowerCase().includes(q.correctAnswer?.toLowerCase() || '');

              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">{q.question}</p>
                        <div className="bg-muted p-3 rounded-lg mb-2">
                          <p className="text-sm">
                            <span className="font-medium">Your Answer:</span>{' '}
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {q.userAnswer || 'Not answered'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm mt-1">
                              <span className="font-medium">Correct Answer:</span>{' '}
                              <span className="text-green-600">{q.correctAnswer}</span>
                            </p>
                          )}
                        </div>
                        {q.explanation && (
                          <div className="bg-primary/5 p-3 rounded-lg">
                            <p className="text-sm text-muted-foreground">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                      <Badge className={isCorrect ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}>
                        {isCorrect ? `+${q.marks}` : '0'}/{q.marks}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (session) {
    const currentQuestion = session.questions[0];
    const progress = ((session.totalQuestions - session.questions.length) / session.totalQuestions) * 100;
    const isTimeLow = timeLeft < 60;

    return (
      <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                Question {session.totalQuestions - session.questions.length + 1} of {session.totalQuestions}
              </p>
              <div className={`flex items-center gap-2 ${isTimeLow ? 'text-red-500 animate-pulse' : ''}`}>
                <Clock className="h-4 w-4" />
                <span className="text-sm font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <Badge className="mb-4" variant="secondary">
                {session.topic} • {currentQuestion.marks} marks
              </Badge>
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
              
              {currentQuestion.type === 'mcq' && currentQuestion.options ? (
                <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                          currentAnswer === option ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                        }`}
                        onClick={() => setCurrentAnswer(option)}
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              ) : (
                <Textarea
                  placeholder="Type your answer here..."
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  className="min-h-[150px]"
                />
              )}

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => finishTest()}>
                  End Test
                </Button>
                <Button 
                  onClick={submitAnswer}
                  disabled={!currentAnswer.trim()}
                  className="gap-2"
                >
                  {session.questions.length === 1 ? 'Finish Test' : 'Next Question'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-bold">{session.totalQuestions}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Total Marks</p>
                <p className="font-bold">
                  {session.questions.reduce((sum, q) => sum + q.marks, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Time Left</p>
                <p className={`font-bold ${isTimeLow ? 'text-red-500' : ''}`}>
                  {formatTime(timeLeft)}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TestPage;
