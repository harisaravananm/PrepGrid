import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { codingQuestions } from '@/data/mockData';
import Editor from '@monaco-editor/react';
import {
  Play,
  CheckCircle,
  XCircle,
  Clock,
  MemoryStick,
  ChevronLeft,
  BookOpen,
  Lightbulb,
  Code2,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

const CodeEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const question = codingQuestions.find(q => q.id === id);
  
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; actual: string }[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (question) {
      setCode(question.starterCode[language] || question.starterCode.javascript);
    }
  }, [question, language]);

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Question not found</h2>
          <Button onClick={() => navigate('/practice')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Practice
          </Button>
        </div>
      </div>
    );
  }

  const isSolved = user?.solvedQuestions.includes(question.id);

  const languages = [
    { id: 'javascript', name: 'JavaScript', extension: 'js' },
    { id: 'python', name: 'Python', extension: 'py' },
    { id: 'java', name: 'Java', extension: 'java' },
    { id: 'cpp', name: 'C++', extension: 'cpp' },
  ];

  const languageIds: Record<string, number> = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
    sql: 82
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setTestResults([]);

    try {
      if (question.topic === 'SQL') {
        await simulateSQLExecution();
      } else {
        await executeWithJudge0();
      }
    } catch (error) {
      toast.error('Failed to run code. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const executeWithJudge0 = async () => {
    const testCases = question.testCases.filter(tc => !tc.isHidden);
    const results = [];

    for (const testCase of testCases) {
      const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'demo-key',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageIds[language],
          stdin: testCase.input.replace(/\[|\]|"/g, '').replace(/,/g, ' '),
          expected_output: testCase.expectedOutput
        })
      });

      if (!response.ok) {
        setOutput('Error: Unable to execute code. Please try again later.');
        return;
      }

      const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 2000));

      const getResult = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${data.token}`, {
        headers: {
          'X-RapidAPI-Key': 'demo-key',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      });

      const result = await getResult.json();
      
      const passed = result.stdout?.trim() === testCase.expectedOutput.trim() || 
                    result.status?.description === 'Accepted';

      results.push({
        passed,
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: result.stdout?.trim() || result.stderr || 'Error'
      });

      if (result.stdout) {
        setOutput(prev => prev + `Test Case:\nInput: ${testCase.input}\nOutput: ${result.stdout}\n\n`);
      } else if (result.stderr) {
        setOutput(prev => prev + `Error: ${result.stderr}\n\n`);
      }
    }

    setTestResults(results);

    const allPassed = results.every(r => r.passed);
    if (allPassed) {
      toast.success('All test cases passed!');
      if (!isSolved && user) {
        updateUser({
          solvedQuestions: [...user.solvedQuestions, question.id]
        });
      }
    } else {
      toast.error('Some test cases failed. Keep trying!');
    }
  };

  const simulateSQLExecution = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = question.testCases.map(testCase => ({
      passed: true,
      input: testCase.input,
      expected: testCase.expectedOutput,
      actual: testCase.expectedOutput
    }));

    setTestResults(results);
    setOutput('Query executed successfully!\n\nResult: ' + question.testCases[0].expectedOutput);
    toast.success('SQL query executed successfully!');
    
    if (!isSolved && user) {
      updateUser({
        solvedQuestions: [...user.solvedQuestions, question.id]
      });
    }
  };

  const resetCode = () => {
    setCode(question.starterCode[language] || question.starterCode.javascript);
    setOutput('');
    setTestResults([]);
    toast.info('Code reset to default');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-600';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600';
      case 'Hard': return 'bg-red-500/10 text-red-600';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/practice')}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{question.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getDifficultyColor(question.difficulty)}>
                    {question.difficulty}
                  </Badge>
                  <Badge variant="outline">{question.topic}</Badge>
                  {isSolved && (
                    <Badge className="bg-green-500/10 text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Solved
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={resetCode}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={runCode} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="h-[calc(100vh-200px)]">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-0">
                <TabsList>
                  <TabsTrigger value="description">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="hints">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Hints
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="description" className="mt-0">
                  <ScrollArea className="h-[calc(100vh-320px)]">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-2">Problem Statement</h3>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {question.description}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold mb-3">Examples</h3>
                        <div className="space-y-4">
                          {question.examples.map((example, index) => (
                            <div key={index} className="bg-muted p-4 rounded-lg">
                              <p className="text-sm mb-1">
                                <span className="font-medium">Input:</span> {example.input}
                              </p>
                              <p className="text-sm mb-1">
                                <span className="font-medium">Output:</span> {example.output}
                              </p>
                              {example.explanation && (
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium">Explanation:</span> {example.explanation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-semibold mb-2">Constraints</h3>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {question.constraints.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Time: {question.timeComplexity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MemoryStick className="h-4 w-4 text-muted-foreground" />
                          <span>Space: {question.spaceComplexity}</span>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="hints" className="mt-0">
                  <ScrollArea className="h-[calc(100vh-320px)]">
                    <div className="space-y-4">
                      {!showHints ? (
                        <div className="text-center py-8">
                          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">
                            Need help? Reveal hints to get unstuck.
                          </p>
                          <Button onClick={() => setShowHints(true)}>
                            Show Hints
                          </Button>
                        </div>
                      ) : (
                        question.hints.map((hint, index) => (
                          <div key={index} className="bg-yellow-500/10 p-4 rounded-lg">
                            <p className="font-medium mb-1">Hint {index + 1}</p>
                            <p className="text-muted-foreground">{hint}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    Code Editor
                  </CardTitle>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-sm border rounded px-2 py-1 bg-background"
                  >
                    {languages.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Editor
                  height="400px"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Output</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[150px]">
                  {output ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Run your code to see the output here...
                    </p>
                  )}
                </ScrollArea>

                {testResults.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Test Results</p>
                    <div className="space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-2 p-2 rounded ${
                            result.passed ? 'bg-green-500/10' : 'bg-red-500/10'
                          }`}
                        >
                          {result.passed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">
                            Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
