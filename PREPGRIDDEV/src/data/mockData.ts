import type { CodingQuestion, User, LeaderboardEntry, AdminAnalytics, Role } from '@/types';

export const codingQuestions: CodingQuestion[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    difficulty: 'Easy',
    topic: 'Arrays',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
    starterCode: {
      javascript: 'function twoSum(nums, target) {\n    // Write your code here\n    \n}',
      python: 'def twoSum(nums, target):\n    # Write your code here\n    pass',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n    \n}'
    },
    testCases: [
      { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]', isHidden: false },
      { input: '[3,2,4]\n6', expectedOutput: '[1,2]', isHidden: false },
      { input: '[3,3]\n6', expectedOutput: '[0,1]', isHidden: true }
    ],
    hints: ['Try using a hash map to store the complement', 'For each number, check if its complement exists in the map'],
    solution: 'Use a hash map to store the complement of each number. For each number, check if its complement exists in the map.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: '2',
    title: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy',
    topic: 'Trees',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' }
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000]', '-5000 <= Node.val <= 5000'],
    starterCode: {
      javascript: 'function reverseList(head) {\n    // Write your code here\n    \n}',
      python: 'def reverseList(head):\n    # Write your code here\n    pass',
      java: 'class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your code here\n        \n    }\n}',
      cpp: 'ListNode* reverseList(ListNode* head) {\n    // Write your code here\n    \n}'
    },
    testCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isHidden: false },
      { input: '[1,2]', expectedOutput: '[2,1]', isHidden: false }
    ],
    hints: ['Use three pointers: prev, curr, next', 'Iterate through the list and reverse the links'],
    solution: 'Use three pointers to iterate through the list and reverse the links between nodes.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    topic: 'Strings',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    starterCode: {
      javascript: 'function lengthOfLongestSubstring(s) {\n    // Write your code here\n    \n}',
      python: 'def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass',
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        \n    }\n}',
      cpp: 'int lengthOfLongestSubstring(string s) {\n    // Write your code here\n    \n}'
    },
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3', isHidden: false },
      { input: '"bbbbb"', expectedOutput: '1', isHidden: false },
      { input: '"pwwkew"', expectedOutput: '3', isHidden: true }
    ],
    hints: ['Use the sliding window technique', 'Maintain a set of characters in the current window'],
    solution: 'Use sliding window with a hash set to track characters in the current window.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n))'
  },
  {
    id: '4',
    title: 'Climbing Stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    difficulty: 'Easy',
    topic: 'DP',
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top: 1 step + 1 step, or 2 steps.' },
      { input: 'n = 3', output: '3', explanation: 'There are three ways: 1+1+1, 1+2, 2+1.' }
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: {
      javascript: 'function climbStairs(n) {\n    // Write your code here\n    \n}',
      python: 'def climbStairs(n):\n    # Write your code here\n    pass',
      java: 'class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n        \n    }\n}',
      cpp: 'int climbStairs(int n) {\n    // Write your code here\n    \n}'
    },
    testCases: [
      { input: '2', expectedOutput: '2', isHidden: false },
      { input: '3', expectedOutput: '3', isHidden: false },
      { input: '4', expectedOutput: '5', isHidden: true }
    ],
    hints: ['Think of this as a Fibonacci sequence', 'Use dynamic programming to store previous results'],
    solution: 'Use dynamic programming where dp[i] = dp[i-1] + dp[i-2].',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: '5',
    title: 'Number of Islands',
    description: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    difficulty: 'Medium',
    topic: 'Graphs',
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' }
    ],
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\'.'],
    starterCode: {
      javascript: 'function numIslands(grid) {\n    // Write your code here\n    \n}',
      python: 'def numIslands(grid):\n    # Write your code here\n    pass',
      java: 'class Solution {\n    public int numIslands(char[][] grid) {\n        // Write your code here\n        \n    }\n}',
      cpp: 'int numIslands(vector<vector<char>>& grid) {\n    // Write your code here\n    \n}'
    },
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: '1', isHidden: false },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: '3', isHidden: false }
    ],
    hints: ['Use DFS or BFS to explore each island', 'Mark visited cells to avoid counting twice'],
    solution: 'Use DFS to explore each island and mark visited cells.',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)'
  },
  {
    id: '6',
    title: 'Merge K Sorted Lists',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'Hard',
    topic: 'Trees',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
      { input: 'lists = [[]]', output: '[]' }
    ],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
    starterCode: {
      javascript: 'function mergeKLists(lists) {\n    // Write your code here\n    \n}',
      python: 'def mergeKLists(lists):\n    # Write your code here\n    pass',
      java: 'class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write your code here\n        \n    }\n}',
      cpp: 'ListNode* mergeKLists(vector<ListNode*>& lists) {\n    // Write your code here\n    \n}'
    },
    testCases: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,3,4,4,5,6]', isHidden: false },
      { input: '[]', expectedOutput: '[]', isHidden: false }
    ],
    hints: ['Use a min-heap/priority queue', 'Or use divide and conquer approach'],
    solution: 'Use a priority queue to always get the smallest element from all lists.',
    timeComplexity: 'O(N log k)',
    spaceComplexity: 'O(k)'
  },
  {
    id: '7',
    title: 'SQL: Second Highest Salary',
    description: 'Write a SQL query to get the second highest salary from the Employee table.\n\nTable: Employee\n+----+--------+\n| Id | Salary |\n+----+--------+\n| 1  | 100    |\n| 2  | 200    |\n| 3  | 300    |\n+----+--------+',
    difficulty: 'Easy',
    topic: 'SQL',
    examples: [
      { input: 'Employee table with salaries 100, 200, 300', output: '200' },
      { input: 'Employee table with only one salary', output: 'null' }
    ],
    constraints: ['If there is no second highest salary, return null.'],
    starterCode: {
      sql: 'SELECT \n    -- Write your query here\nFROM Employee;'
    },
    testCases: [
      { input: '100,200,300', expectedOutput: '200', isHidden: false },
      { input: '100', expectedOutput: 'null', isHidden: false }
    ],
    hints: ['Use DISTINCT to remove duplicates', 'Use LIMIT and OFFSET or subquery'],
    solution: 'SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT 1 OFFSET 1;',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: '8',
    title: 'Longest Palindromic Substring',
    description: 'Given a string s, return the longest palindromic substring in s.',
    difficulty: 'Medium',
    topic: 'Strings',
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' }
    ],
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'],
    starterCode: {
      javascript: 'function longestPalindrome(s) {\n    // Write your code here\n    \n}',
      python: 'def longestPalindrome(s):\n    # Write your code here\n    pass',
      java: 'class Solution {\n    public String longestPalindrome(String s) {\n        // Write your code here\n        \n    }\n}',
      cpp: 'string longestPalindrome(string s) {\n    // Write your code here\n    \n}'
    },
    testCases: [
      { input: '"babad"', expectedOutput: '"bab"', isHidden: false },
      { input: '"cbbd"', expectedOutput: '"bb"', isHidden: false }
    ],
    hints: ['Expand around centers', 'Or use dynamic programming'],
    solution: 'Expand around each possible center (2n-1 centers) and find the longest palindrome.',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)'
  }
];

export const interviewQuestions: Record<Role, string[]> = {
  'Frontend': [
    'Explain the Virtual DOM in React and how it improves performance.',
    'What are the differences between var, let, and const in JavaScript?',
    'Explain CSS Box Model and how box-sizing property affects it.',
    'What are React Hooks and why were they introduced?',
    'Explain the event loop in JavaScript.',
    'What is the difference between display: none and visibility: hidden?',
    'Explain CORS and how to handle it in a web application.',
    'What are semantic HTML elements and why are they important?',
    'Explain the difference between sessionStorage and localStorage.',
    'What is debouncing and throttling in JavaScript?'
  ],
  'Backend': [
    'Explain RESTful API design principles.',
    'What is the difference between SQL and NoSQL databases?',
    'Explain how JWT authentication works.',
    'What are database indexes and when should you use them?',
    'Explain the CAP theorem in distributed systems.',
    'What is the difference between processes and threads?',
    'Explain how caching works and common caching strategies.',
    'What is middleware in Express.js?',
    'Explain database normalization and its different forms.',
    'What are WebSockets and when would you use them?'
  ],
  'Full Stack': [
    'Explain the MVC architecture pattern.',
    'How do you handle state management in a full-stack application?',
    'Explain the request-response lifecycle in a web application.',
    'What strategies do you use for API versioning?',
    'How do you ensure security in a full-stack application?',
    'Explain server-side rendering vs client-side rendering.',
    'What is CI/CD and how have you implemented it?',
    'How do you optimize database queries in a large application?',
    'Explain microservices architecture and its pros/cons.',
    'How do you handle file uploads securely?'
  ],
  'DSA': [
    'Explain the time and space complexity of quicksort.',
    'What is the difference between a stack and a queue?',
    'Explain how a hash table works and handle collisions.',
    'What are the different types of binary tree traversals?',
    'Explain Dijkstra\'s algorithm for shortest path.',
    'What is dynamic programming and when would you use it?',
    'Explain the difference between BFS and DFS.',
    'What is a heap and what are its applications?',
    'Explain the sliding window technique with an example.',
    'What is trie and what are its use cases?'
  ]
};

export const testQuestions: Record<string, { question: string; type: 'mcq' | 'short_answer'; options?: string[]; correctAnswer: string; explanation: string; marks: number }[]> = {
  'React Hooks': [
    {
      question: 'Which hook is used to perform side effects in functional components?',
      type: 'mcq',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 'useEffect',
      explanation: 'useEffect is designed to handle side effects like data fetching, subscriptions, or DOM mutations.',
      marks: 10
    },
    {
      question: 'What is the purpose of the useCallback hook?',
      type: 'mcq',
      options: ['To memoize values', 'To memoize functions', 'To handle side effects', 'To manage state'],
      correctAnswer: 'To memoize functions',
      explanation: 'useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed.',
      marks: 10
    },
    {
      question: 'Explain the rules of hooks in React.',
      type: 'short_answer',
      correctAnswer: 'Only call hooks at the top level and only call hooks from React functions',
      explanation: 'Hooks must be called at the top level of your component, not inside loops, conditions, or nested functions. They can only be called from React function components or custom hooks.',
      marks: 20
    }
  ],
  'DBMS Normalization': [
    {
      question: 'Which normal form eliminates transitive dependencies?',
      type: 'mcq',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      correctAnswer: '3NF',
      explanation: 'Third Normal Form (3NF) requires that all non-key attributes are dependent only on the primary key, eliminating transitive dependencies.',
      marks: 10
    },
    {
      question: 'What is the main goal of database normalization?',
      type: 'mcq',
      options: ['Increase query speed', 'Reduce data redundancy', 'Improve security', 'Add more tables'],
      correctAnswer: 'Reduce data redundancy',
      explanation: 'Normalization is the process of organizing data to reduce redundancy and improve data integrity.',
      marks: 10
    },
    {
      question: 'Explain the difference between 2NF and 3NF.',
      type: 'short_answer',
      correctAnswer: '2NF eliminates partial dependencies, 3NF eliminates transitive dependencies',
      explanation: '2NF requires all non-key attributes to be fully dependent on the entire primary key. 3NF requires all attributes to be directly dependent on the primary key, not on other non-key attributes.',
      marks: 20
    }
  ],
  'OS Scheduling': [
    {
      question: 'Which scheduling algorithm can cause starvation?',
      type: 'mcq',
      options: ['Round Robin', 'FCFS', 'Priority Scheduling', 'SJF'],
      correctAnswer: 'Priority Scheduling',
      explanation: 'Priority scheduling can cause starvation if low-priority processes never get CPU time because higher-priority processes keep arriving.',
      marks: 10
    },
    {
      question: 'What is the time quantum in Round Robin scheduling?',
      type: 'mcq',
      options: ['Maximum waiting time', 'CPU burst time', 'Fixed time slice for each process', 'Process priority'],
      correctAnswer: 'Fixed time slice for each process',
      explanation: 'The time quantum is the fixed amount of time each process gets to execute before being preempted.',
      marks: 10
    },
    {
      question: 'Compare preemptive and non-preemptive scheduling.',
      type: 'short_answer',
      correctAnswer: 'Preemptive allows interruption, non-preemptive runs to completion',
      explanation: 'Preemptive scheduling allows the OS to interrupt a running process, while non-preemptive scheduling lets a process run until it voluntarily releases the CPU or terminates.',
      marks: 20
    }
  ]
};

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@prepgrid.com',
    name: 'Demo User',
    plan: 'Free',
    createdAt: new Date('2024-01-01'),
    streak: 5,
    lastActive: new Date(),
    interviewsRemaining: 3,
    questionsRemaining: 7,
    solvedQuestions: ['1', '2', '4'],
    bookmarkedQuestions: ['3', '5'],
    interviewHistory: [],
    testHistory: [],
    billingHistory: []
  }
];

export const leaderboard: LeaderboardEntry[] = [
  { userId: '2', name: 'Alice Johnson', score: 95, topic: 'React Hooks', date: new Date('2024-01-15') },
  { userId: '3', name: 'Bob Smith', score: 88, topic: 'React Hooks', date: new Date('2024-01-14') },
  { userId: '4', name: 'Carol White', score: 92, topic: 'DBMS Normalization', date: new Date('2024-01-15') },
  { userId: '5', name: 'David Brown', score: 85, topic: 'OS Scheduling', date: new Date('2024-01-13') },
  { userId: '6', name: 'Emma Davis', score: 90, topic: 'React Hooks', date: new Date('2024-01-12') }
];

export const adminAnalytics: AdminAnalytics = {
  totalUsers: 1250,
  activeUsers: 342,
  totalQuestions: 150,
  mostAttemptedQuestions: [
    { questionId: '1', title: 'Two Sum', attempts: 5234 },
    { questionId: '3', title: 'Longest Substring Without Repeating Characters', attempts: 3891 },
    { questionId: '4', title: 'Climbing Stairs', attempts: 3456 }
  ],
  averageScoresByTopic: [
    { topic: 'Arrays', averageScore: 72 },
    { topic: 'Strings', averageScore: 68 },
    { topic: 'Trees', averageScore: 65 },
    { topic: 'DP', averageScore: 58 },
    { topic: 'Graphs', averageScore: 55 }
  ],
  dailyActiveUsers: [
    { date: '2024-01-01', count: 120 },
    { date: '2024-01-02', count: 135 },
    { date: '2024-01-03', count: 142 },
    { date: '2024-01-04', count: 158 },
    { date: '2024-01-05', count: 165 },
    { date: '2024-01-06', count: 189 },
    { date: '2024-01-07', count: 201 }
  ]
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};
