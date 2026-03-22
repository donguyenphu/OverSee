import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

interface WritingProps {
  userEmail: string;
  onComplete: (results: WritingResults) => void;
}

export interface WritingResults {
  task1: string;
  task2: string;
  email: string;
}

interface WritingTask {
  taskNumber: number;
  title: string;
  timeMinutes: number;
  content: string;
  image?: string;
}

const WritingTasksData: WritingTask[] = [
  {
    taskNumber: 1,
    title: 'Task 1: Academic Writing (Graph Description)',
    timeMinutes: 20,
    image: '/images/wri.jpg',
    content: `The graph shows the average Japanese monthly salary (Yen) from 1953 to 1973, and the prices of black and white televisions and color televisions during the same period.

*Task: Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`
  },
  {
    taskNumber: 2,
    title: 'Task 2: Academic Writing (Essay)',
    timeMinutes: 40,
    content: `*Question: Some people benefit from modern communication technology, but some have not been helped at all. Do you agree or disagree?

*Task: Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`
  }
];

const Writing: React.FC<WritingProps> = ({ userEmail, onComplete }) => {
  const [currentTab, setCurrentTab] = useState('task1');
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes total
  const [task1, setTask1] = useState('');
  const [task2, setTask2] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleComplete();
          return 0;
        }
        
        // Show warning at 5 minutes
        if (prev === 5 * 60) {
          setShowWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleComplete = () => {
    const results: WritingResults = {
      task1,
      task2,
      email: userEmail
    };
    onComplete(results);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTask1Words = () => task1.trim().split(/\s+/).length;
  const getTask2Words = () => task2.trim().split(/\s+/).length;

  return (
    <div className="space-y-6 w-full max-w-screen-2xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">WRITING</h1>
          <p className="text-sm text-muted-foreground">Task 1 + Task 2</p>
        </div>
        <div className="text-right">
          <p className={`text-lg font-semibold ${showWarning ? 'text-red-600' : 'text-foreground'}`}>
            Time: {formatTime(timeLeft)}
          </p>
          {showWarning && (
            <p className="text-sm text-red-600 font-semibold">5 minutes remaining!</p>
          )}
        </div>
      </div>

      {/* Warning Alert */}
      {showWarning && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">⚠️ Warning: 5 minutes remaining. Please finish and submit your answers.</p>
        </div>
      )}

      {/* Tasks Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="task1">
            Task 1
            <span className="ml-2 text-xs">({getTask1Words()} words)</span>
          </TabsTrigger>
          <TabsTrigger value="task2">
            Task 2
            <span className="ml-2 text-xs">({getTask2Words()} words)</span>
          </TabsTrigger>
        </TabsList>

        {/* Task 1 */}
        <TabsContent value="task1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{WritingTasksData[0].title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-[100%]">
                  {WritingTasksData[0].image && (
                    <img
                      src={WritingTasksData[0].image}
                      alt="Writing Task 1"
                      className="w-full max-w-2xl rounded-lg"
                    />
                  )}
                </div>
                <div className="w-[100%]">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-foreground whitespace-pre-line">{WritingTasksData[0].content}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task1-textarea">Your Answer</Label>
                <Textarea
                  id="task1-textarea"
                  value={task1}
                  onChange={(e) => setTask1(e.target.value)}
                  placeholder="Write your answer here..."
                  className="h-96 resize-none text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Minimum: 150 words | Current: {getTask1Words()} words
                  {getTask1Words() < 150 && (
                    <span className="text-orange-600 ml-2">⚠️ Below minimum</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Task 2 */}
        <TabsContent value="task2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{WritingTasksData[1].title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-foreground whitespace-pre-line">{WritingTasksData[1].content}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task2-textarea">Your Answer</Label>
                <Textarea
                  id="task2-textarea"
                  value={task2}
                  onChange={(e) => setTask2(e.target.value)}
                  placeholder="Write your essay here..."
                  className="h-96 resize-none text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Minimum: 250 words | Current: {getTask2Words()} words
                  {getTask2Words() < 250 && (
                    <span className="text-orange-600 ml-2">⚠️ Below minimum</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submit Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {getTask1Words() < 150 || getTask2Words() < 250 ? (
            <p className="text-orange-600 font-semibold">⚠️ Check word counts before submitting</p>
          ) : (
            <p className="text-green-600 font-semibold">✓ Both tasks meet minimum requirements</p>
          )}
        </div>
        
        <Button
          onClick={handleComplete}
          className="bg-green-600 hover:bg-green-700"
          size="lg"
        >
          Submit Writing
        </Button>
      </div>
    </div>
  );
};

export default Writing;
