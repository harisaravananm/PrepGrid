import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { interviewQuestions } from '@/data/mockData';
import type { InterviewSession, InterviewQuestion } from '@/types';
import type { Role } from '@/types';
import {
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Clock,
  ChevronRight,
  Trophy,
  Target,
  TrendingUp,
  RotateCcw,
  AlertCircle,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';

const InterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const roles: { id: Role; name: string; description: string; icon: React.ReactNode }[] = [
    {
      id: 'Frontend',
      name: 'Frontend Developer',
      description: 'HTML, CSS, JavaScript, React, and modern web technologies',
      icon: <div className="text-2xl">🎨</div>
    },
    {
      id: 'Backend',
      name: 'Backend Developer',
      description: 'Server-side, databases, APIs, and system architecture',
      icon: <div className="text-2xl">⚙️</div>
    },
    {
      id: 'Full Stack',
      name: 'Full Stack Developer',
      description: 'Both frontend and backend technologies',
      icon: <div className="text-2xl">🚀</div>
    },
    {
      id: 'DSA',
      name: 'DSA & Algorithms',
      description: 'Data structures, algorithms, and problem solving',
      icon: <div className="text-2xl">🧮</div>
    }
  ];

  useEffect(() => {
    if (session && !showResults) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session, showResults]);

  const startInterview = (role: Role) => {
    if (user?.plan === 'Free' && (user?.interviewsRemaining || 0) <= 0) {
      toast.error('You have used all your free interviews. Upgrade to Pro for unlimited access!');
      return;
    }

    setSelectedRole(role);
    
    const questions: InterviewQuestion[] = interviewQuestions[role]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map((q, index) => ({
        id: `q${index}`,
        question: q,
        expectedTopics: [],
        difficulty: (index < 2 ? 'Easy' : index < 4 ? 'Medium' : 'Hard') as 'Easy' | 'Medium' | 'Hard'
      }));

    const newSession: InterviewSession = {
      id: Date.now().toString(),
      role,
      startedAt: new Date(),
      questions,
      currentQuestionIndex: 0,
      totalScore: 0,
      feedback: '',
      status: 'in_progress'
    };

    setSession(newSession);
    setTimer(0);
    
    if (user?.plan === 'Free') {
      updateUser({ interviewsRemaining: (user.interviewsRemaining || 0) - 1 });
    }
  };

  const evaluateAnswer = async () => {
    if (!currentAnswer.trim()) {
      toast.error('Please provide an answer before submitting');
      return;
    }

    setIsEvaluating(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (session) {
      const currentQuestion = session.questions[session.currentQuestionIndex];
      const score = Math.floor(Math.random() * 40) + 60;
      
      const feedbacks = [
        'Good answer! You covered the main points well. Consider adding more details about implementation.',
        'Great explanation! Your understanding of the concept is clear. Try to include examples next time.',
        'Solid answer! You demonstrated good knowledge. Could improve by mentioning edge cases.',
        'Well structured response! Consider discussing performance implications as well.'
      ];

      const updatedQuestions = [...session.questions];
      updatedQuestions[session.currentQuestionIndex] = {
        ...currentQuestion,
        userAnswer: currentAnswer,
        score,
        feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)],
        timeTaken: timer
      };

      const newTotalScore = updatedQuestions.reduce((sum, q) => sum + (q.score || 0), 0) / updatedQuestions.length;

      setSession({
        ...session,
        questions: updatedQuestions,
        totalScore: Math.round(newTotalScore)
      });

      setCurrentAnswer('');
      setTimer(0);

      if (session.currentQuestionIndex < session.questions.length - 1) {
        setSession(prev => prev ? { ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 } : null);
      } else {
        finishInterview(updatedQuestions, Math.round(newTotalScore));
      }
    }

    setIsEvaluating(false);
  };

  const finishInterview = (questions: InterviewQuestion[], finalScore: number) => {
    if (session && user) {
      const completedSession: InterviewSession = {
        ...session,
        questions,
        totalScore: finalScore,
        completedAt: new Date(),
        status: 'completed',
        feedback: finalScore >= 80 
          ? 'Excellent performance! You demonstrated strong technical knowledge.'
          : finalScore >= 60
          ? 'Good effort! Keep practicing to improve your responses.'
          : 'Keep practicing! Review the topics and try again.'
      };

      setSession(completedSession);
      setShowResults(true);

      updateUser({
        interviewHistory: [...(user.interviewHistory || []), completedSession]
      });

      toast.success('Interview completed! Check your results.');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info('Voice recording started (simulated)');
      setTimeout(() => {
        setCurrentAnswer(prev => prev + ' This is a simulated voice input. ');
        setIsRecording(false);
        toast.info('Voice recording stopped');
      }, 3000);
    } else {
      toast.info('Voice recording stopped');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetInterview = () => {
    setSelectedRole(null);
    setSession(null);
    setCurrentAnswer('');
    setShowResults(false);
    setTimer(0);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Mock Interview</h1>
            <p className="text-muted-foreground">
              Practice with AI-powered interviews tailored to your role
            </p>
          </div>

          {user?.plan === 'Free' && (
            <Card className="mb-8 bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-4 flex items-center gap-4">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Free Plan Limit</p>
                  <p className="text-sm text-muted-foreground">
                    You have {user.interviewsRemaining} AI interviews remaining this month.
                  </p>
                </div>
                <Button variant="outline" className="ml-auto" onClick={() => navigate('/billing')}>
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card
                key={role.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => startInterview(role.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{role.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{role.name}</h3>
                      <p className="text-muted-foreground mb-4">{role.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">5 Questions</Badge>
                        <Badge variant="outline">~15 mins</Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {user?.interviewHistory && user.interviewHistory.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Past Interviews</h2>
              <div className="space-y-4">
                {[...user.interviewHistory].reverse().slice(0, 5).map((interview, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{interview.role} Interview</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(interview.startedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Score</p>
                            <p className={`font-bold ${
                              interview.totalScore >= 80 ? 'text-green-600' :
                              interview.totalScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {interview.totalScore}%
                            </p>
                          </div>
                          <Badge className={
                            interview.totalScore >= 80 ? 'bg-green-500/10 text-green-600' :
                            interview.totalScore >= 60 ? 'bg-yellow-500/10 text-yellow-600' :
                            'bg-red-500/10 text-red-600'
                          }>
                            {interview.totalScore >= 80 ? 'Excellent' :
                             interview.totalScore >= 60 ? 'Good' : 'Needs Work'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
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
              <h1 className="text-3xl font-bold mb-2">Interview Completed!</h1>
              <p className="text-muted-foreground mb-6">
                Here's how you performed in your {session.role} interview
              </p>
              
              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{session.totalScore}%</div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{session.questions.length}</div>
                  <p className="text-sm text-muted-foreground">Questions</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {Math.round(session.questions.reduce((sum, q) => sum + (q.timeTaken || 0), 0) / 60)}m
                  </div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mb-6">
                <p className="font-medium mb-2">Feedback</p>
                <p className="text-muted-foreground">{session.feedback}</p>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={resetInterview}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start New Interview
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mb-4">Question Review</h2>
          <div className="space-y-4">
            {session.questions.map((q, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">Question {index + 1}</p>
                      <p className="text-sm text-muted-foreground">{q.question}</p>
                    </div>
                    <Badge className={
                      (q.score || 0) >= 80 ? 'bg-green-500/10 text-green-600' :
                      (q.score || 0) >= 60 ? 'bg-yellow-500/10 text-yellow-600' :
                      'bg-red-500/10 text-red-600'
                    }>
                      {q.score}%
                    </Badge>
                  </div>
                  <div className="bg-muted p-3 rounded-lg mb-2">
                    <p className="text-sm font-medium mb-1">Your Answer:</p>
                    <p className="text-sm text-muted-foreground">{q.userAnswer}</p>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Feedback:</p>
                    <p className="text-sm text-muted-foreground">{q.feedback}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (session) {
    const currentQuestion = session.questions[session.currentQuestionIndex];
    const progress = ((session.currentQuestionIndex) / session.questions.length) * 100;

    return (
      <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                Question {session.currentQuestionIndex + 1} of {session.questions.length}
              </p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{formatTime(timer)}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <Badge className="mb-4" variant="secondary">
                {session.role} • {currentQuestion.difficulty}
              </Badge>
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Type your answer here..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    className="min-h-[200px] pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute bottom-3 right-3 ${isRecording ? 'text-red-500 animate-pulse' : ''}`}
                    onClick={toggleRecording}
                  >
                    {isRecording ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentAnswer('')}>
                    Clear
                  </Button>
                  <Button 
                    onClick={evaluateAnswer} 
                    disabled={isEvaluating || !currentAnswer.trim()}
                    className="gap-2"
                  >
                    {isEvaluating ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        Submit Answer
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-bold">{session.questions.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="font-bold">{session.totalScore || '-'}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-bold">{formatTime(timer)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InterviewPage;
