import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { readingSections } from '@/data/readingContent';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';

interface ReadingProps {
  userEmail: string;
  onComplete: (results: ReadingResults) => void;
}

export interface ReadingResults {
  answers: { [key: number]: string };
  sectionScores: { [key: number]: number };
  totalScore: number;
}

const Reading: React.FC<ReadingProps> = ({ userEmail, onComplete }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showScrollableContent, setShowScrollableContent] = useState(true);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionNumber: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: value
    }));
  };

  const handleNextSection = () => {
    if (currentSectionIndex < readingSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleComplete = () => {
    const results: ReadingResults = {
      answers,
      sectionScores: {},
      totalScore: 0
    };
    onComplete(results);
  };

  const section = readingSections[currentSectionIndex];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">READING</h1>
          <p className="text-sm text-muted-foreground">Passage {section.id} of 3</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-foreground">
            Time: {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-2 gap-6 min-h-[600px]">
        {/* Left: Reading Passage */}
        <div className="border rounded-lg p-6 bg-card overflow-y-auto max-h-[700px]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
            
            {section.subtitleOrImage && (
              <p className="text-sm italic text-muted-foreground">{section.subtitleOrImage}</p>
            )}

            {section.imageUrl && (
              <img
                src={section.imageUrl}
                alt={section.title}
                className="w-full rounded-lg mb-4"
              />
            )}

            {section.passages.map((passage, idx) => (
              <p key={idx} className="text-base leading-relaxed text-foreground">
                {passage}
              </p>
            ))}
          </div>
        </div>

        {/* Right: Questions */}
        <div className="border rounded-lg p-6 bg-card overflow-y-auto max-h-[700px]">
          <Card className="border-0 bg-transparent">
            <CardHeader>
              <CardTitle>Questions {section.questions[0].globalNumber}-{section.questions[section.questions.length - 1].globalNumber}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.questions.map(q => (
                <div key={q.globalNumber} className="space-y-2">
                  <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold">
                    {q.globalNumber}. {q.question}
                  </Label>
                  
                  {q.options ? (
                    <div className="space-y-2">
                      {q.options.map((option, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={`q-${q.globalNumber}-${idx}`}
                            name={`q-${q.globalNumber}`}
                            value={option}
                            checked={answers[q.globalNumber] === option}
                            onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                            className="w-4 h-4"
                          />
                          <label htmlFor={`q-${q.globalNumber}-${idx}`} className="text-sm cursor-pointer">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Input
                      id={`q-${q.globalNumber}`}
                      value={answers[q.globalNumber] || ''}
                      onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                      placeholder="Enter your answer"
                      className="text-base"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handlePreviousSection}
          disabled={currentSectionIndex === 0}
          variant="outline"
        >
          ← Previous Passage
        </Button>

        {currentSectionIndex < readingSections.length - 1 ? (
          <Button onClick={handleNextSection}>
            Next Passage →
          </Button>
        ) : (
          <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
            Complete Reading
          </Button>
        )}
      </div>
    </div>
  );
};

export default Reading;
