import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { mockUsers, getCurrentUser, setCurrentUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  upgradeToPro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAdmin(currentUser.email === 'admin@prepgrid.com');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@prepgrid.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin',
        email: 'admin@prepgrid.com',
        name: 'Admin',
        plan: 'Pro',
        createdAt: new Date(),
        streak: 0,
        lastActive: new Date(),
        interviewsRemaining: 999,
        questionsRemaining: 999,
        solvedQuestions: [],
        bookmarkedQuestions: [],
        interviewHistory: [],
        testHistory: [],
        billingHistory: []
      };
      setUser(adminUser);
      setIsAdmin(true);
      setCurrentUser(adminUser);
      return true;
    }
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      setIsAdmin(false);
      setCurrentUser(foundUser);
      return true;
    }
    
    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        plan: 'Free',
        createdAt: new Date(),
        streak: 1,
        lastActive: new Date(),
        interviewsRemaining: 5,
        questionsRemaining: 10,
        solvedQuestions: [],
        bookmarkedQuestions: [],
        interviewHistory: [],
        testHistory: [],
        billingHistory: []
      };
      setUser(newUser);
      setIsAdmin(false);
      setCurrentUser(newUser);
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      plan: 'Free',
      createdAt: new Date(),
      streak: 1,
      lastActive: new Date(),
      interviewsRemaining: 5,
      questionsRemaining: 10,
      solvedQuestions: [],
      bookmarkedQuestions: [],
      interviewHistory: [],
      testHistory: [],
      billingHistory: []
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    setIsAdmin(false);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setCurrentUser(null);
  };

  const forgotPassword = async (_email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const verifyOTP = async (_email: string, otp: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return otp === '123456';
  };

  const resetPassword = async (_email: string, _newPassword: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      setCurrentUser(updatedUser);
    }
  };

  const upgradeToPro = () => {
    if (user) {
      const updatedUser: User = {
        ...user,
        plan: 'Pro',
        interviewsRemaining: 999,
        questionsRemaining: 999,
        billingHistory: [
          ...user.billingHistory,
          {
            id: Date.now().toString(),
            date: new Date(),
            amount: 999,
            description: 'PrepGrid Pro Subscription',
            status: 'success',
            plan: 'Pro'
          }
        ]
      };
      setUser(updatedUser);
      setCurrentUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin,
      login,
      register,
      logout,
      forgotPassword,
      verifyOTP,
      resetPassword,
      updateUser,
      upgradeToPro
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
