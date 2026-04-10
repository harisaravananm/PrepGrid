export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Topic = 'Arrays' | 'Strings' | 'Trees' | 'DP' | 'Graphs' | 'SQL' | 'OS' | 'DBMS' | 'React' | 'Node.js' | 'System Design';
export type Role = 'Frontend' | 'Backend' | 'Full Stack' | 'DSA';
export type Plan = 'Free' | 'Pro';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: Plan;
  createdAt: Date;
  streak: number;
  lastActive: Date;
  interviewsRemaining: number;
  questionsRemaining: number;
  solvedQuestions: string[];
  bookmarkedQuestions: string[];
  interviewHistory: InterviewSession[];
  testHistory: TestSession[];
  billingHistory: BillingRecord[];
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: Topic;
  examples: Example[];
  constraints: string[];
  starterCode: Record<string, string>;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface InterviewSession {
  id: string;
  role: Role;
  startedAt: Date;
  completedAt?: Date;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  totalScore: number;
  feedback: string;
  status: 'in_progress' | 'completed' | 'abandoned';
}

export interface InterviewQuestion {
  id: string;
  question: string;
  expectedTopics: string[];
  difficulty: Difficulty;
  userAnswer?: string;
  score?: number;
  feedback?: string;
  timeTaken?: number;
}

export interface TestSession {
  id: string;
  topic: string;
  startedAt: Date;
  completedAt?: Date;
  questions: TestQuestion[];
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeLimit: number;
  timeTaken: number;
}

export interface TestQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'short_answer';
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
  explanation?: string;
  marks: number;
}

export interface BillingRecord {
  id: string;
  date: Date;
  amount: number;
  description: string;
  status: 'success' | 'failed' | 'pending';
  plan: Plan;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  score: number;
  topic: string;
  date: Date;
}

export interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalQuestions: number;
  mostAttemptedQuestions: { questionId: string; title: string; attempts: number }[];
  averageScoresByTopic: { topic: string; averageScore: number }[];
  dailyActiveUsers: { date: string; count: number }[];
}
