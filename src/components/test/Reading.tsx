import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { readingSections } from '@/data/readingContent';
import { readingAnswers as readingAnswerKey, isAnswerCorrect } from '@/data/answerKeys';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Highlighter, X } from 'lucide-react';
import { useTextHighlight } from '@/hooks/useTextHighlight';

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
  const [showReview, setShowReview] = useState(false);
  const [showScrollableContent, setShowScrollableContent] = useState(true);
  const { highlights, selectedRange, textRef, handleTextSelection, addHighlight, removeHighlight, renderHighlightedText, clearAllHighlights } = useTextHighlight();

  const getReadingAnswers = (questionNumber: number) => {
    const section = readingAnswerKey.sections.find(s =>
      s.questions.some(q => q.question === questionNumber)
    );
    if (!section) return [];
    const question = section.questions.find(q => q.question === questionNumber);
    return question?.answers || [];
  };

  const renderReview = (questionNumber: number) => {
    if (!showReview) return null;
    const userAnswer = answers[questionNumber];
    const correctAnswers = getReadingAnswers(questionNumber);
    const isCorrect = userAnswer && isAnswerCorrect(userAnswer, correctAnswers);
    
    if (!userAnswer) {
      return (
        <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm font-semibold text-red-700">❌ No answer</p>
          <p className="text-sm text-red-600">✓ Correct: <span className="font-bold text-green-600">{correctAnswers.join(' or ')}</span></p>
        </div>
      );
    }
    
    if (isCorrect) {
      return (
        <div className="mt-2 p-2 bg-green-50 border-l-4 border-green-500 rounded">
          <p className="text-sm font-semibold text-green-700">✓ Correct!</p>
        </div>
      );
    }
    
    return (
      <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded">
        <p className="text-sm font-semibold text-red-700">❌ Wrong</p>
        <p className="text-sm text-red-600">Your answer: <span className="font-semibold">{userAnswer}</span></p>
        <p className="text-sm text-red-600">✓ Correct: <span className="font-bold text-green-600">{correctAnswers.join(' or ')}</span></p>
      </div>
    );
  };

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
    <div className="space-y-6 w-full max-w-screen-2xl mx-auto px-4 py-4">
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

      {/* 2-Column Layout (reading + questions) */}
      <div className="grid grid-cols-12 gap-6 min-h-[600px] w-full">
        {/* Passage area */}
        <div className="col-span-12 lg:col-span-6 border rounded-lg p-6 bg-card overflow-y-auto max-h-[700px] w-full">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{section.title}</h2>
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

            {/* Highlight buttons */}
            {selectedRange && (
              <div className="flex gap-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <Button 
                  size="sm"
                  onClick={addHighlight}
                  className="bg-yellow-500 hover:bg-yellow-600 text-sm"
                >
                  <Highlighter className="w-4 h-4 mr-1" />Highlight
                </Button>
                <Button 
                  size="sm"
                  onClick={removeHighlight}
                  variant="outline"
                  className="text-sm"
                >
                  <X className="w-4 h-4 mr-1" />Remove
                </Button>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="flex gap-2 p-2 bg-slate-50 rounded">
                <span className="text-xs text-muted-foreground">
                  {highlights.length} highlight(s)
                </span>
                <Button 
                  size="sm"
                  variant="ghost"
                  onClick={clearAllHighlights}
                  className="text-xs h-6"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Passages with highlight support */}
            <div 
              ref={textRef}
              onMouseUp={handleTextSelection}
              className="select-text"
            >
              {section.passages.map((passage, idx) => {
                const parts = renderHighlightedText(passage);
                return (
                  <p key={idx} className="text-base leading-relaxed text-foreground mb-4">
                    {parts.map((part, pIdx) => {
                      if (typeof part === 'string') {
                        return part;
                      }
                      return (
                        <span key={part.id} className="bg-yellow-300">
                          {passage.slice(part.start, part.end)}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Questions */}
        <div className="col-span-12 lg:col-span-6 border rounded-lg p-6 bg-card overflow-y-auto max-h-[700px] w-full">
          <Card className="border-0 bg-transparent">
            <CardHeader>
              <CardTitle>Questions {section.questions[0].globalNumber}-{section.questions[section.questions.length - 1].globalNumber}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.id === 1 && (
                <>
                  <div className="text-lg font-bold text-blue-700">Questions 1-7</div>
                  <p>Reading Passage 1 has six paragraphs, A-G.</p>
                  <p>Which paragraph contains the following information?</p>
                  <p>Write the correct letter A-G, in boxes 1-7 on your answer sheet.</p>
                  <p className="italic">NB You may use any letter more than once.</p>
                  {section.questions.filter((q) => q.globalNumber <= 7).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <select
                        id={`q-${q.globalNumber}`}
                        value={answers[q.globalNumber] || ''}
                        onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                        className="w-full rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Type your answer here</option>
                        {q.options?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}

                  <div className="text-lg font-bold text-blue-700 pt-4">Questions 8-11</div>
                  <p>Look at the following people and list of statements below.</p>
                  <p>Match each person with the correct statement.</p>
                  <p>Write the correct letter A-E in boxes 8-11 on your answer sheet.</p>
                  <div className="border rounded-lg p-3 bg-slate-50 text-sm">
                    <p>A: Described his story of selling his product to a chain store</p>
                    <p>B: Explained there was a shortage of money when sales suddenly increased</p>
                    <p>C: Believe innovations need support to succeed</p>
                    <p>D: Believes new products like Shower Power may incur risks</p>
                    <p>E: Says business won’t succeed with innovations</p>
                  </div>
                  {section.questions.filter((q) => q.globalNumber >= 8 && q.globalNumber <= 11).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <select
                        id={`q-${q.globalNumber}`}
                        value={answers[q.globalNumber] || ''}
                        onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                        className="w-full rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Type your answer here</option>
                        {q.options?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}

                  <div className="text-lg font-bold text-blue-700 pt-4">Questions 12-13</div>
                  <p>Choose the correct letter A, B, C or D.</p>
                  <p>Write your answers in boxes 12-13 on your answer sheet.</p>
                  {section.questions.filter((q) => q.globalNumber >= 12 && q.globalNumber <= 13).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <div className="space-y-2">
                        {q.options?.map((option, idx) => {
                          const value = option.split('.')[0].trim();
                          return (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer text-sm">
                              <input
                                type="radio"
                                name={`q-${q.globalNumber}`}
                                value={value}
                                checked={answers[q.globalNumber] === value}
                                onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                                className="w-4 h-4"
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}
                </>
              )}

              {section.id === 2 && (
                <>
                  <div className="text-lg font-bold text-blue-700">Questions 14-17</div>
                  <p>Do the following statements agree with the claims of the writer in Reading Passage?</p>
                  <p>In boxes 14-17 on your answer sheet write:</p>
                  <div className="border rounded-lg p-3 bg-slate-50">
                    <p>TRUE if the statement agrees with the information</p>
                    <p>FALSE if the statement contradicts the information</p>
                    <p>NOT GIVEN if there is no information on this</p>
                  </div>
                  {section.questions.filter((q) => q.globalNumber >= 14 && q.globalNumber <= 17).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <select
                        id={`q-${q.globalNumber}`}
                        value={answers[q.globalNumber] || ''}
                        onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                        className="w-full rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Type your answer here</option>
                        {q.options?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}

                  <div className="text-lg font-bold text-blue-700 pt-4">Questions 18-21</div>
                  <p>Complete the diagram below.</p>
                  <p className="font-semibold text-red-600">Choose NO MORE THAN TWO WORDS from the passage for each answer.</p>
                  <p>Write your answers in boxes 18-21 on your answer sheet.</p>
                  <div className="flex gap-5">
                    <div className="w-[70%]">
                      <img 
                        src="/images/read18.jpg" 
                        alt="Reading 18 diagram" 
                        className="w-full rounded-lg border my-3 w-full" 
                      />
                    </div>
                    <div className="flex flex-col gap-6 w-[30%]"> {/* Parent wrapper to space out the question blocks */}
                      {section.questions
                        .filter((q) => q.globalNumber >= 18 && q.globalNumber <= 21)
                        .map((q) => (
                          <div key={q.globalNumber} className="flex flex-col space-y-2">
                            <Label 
                              htmlFor={`q-${q.globalNumber}`} 
                              className="font-semibold text-base block"
                            >
                              QUESTION {q.globalNumber}. {q.question}
                            </Label>
                            <Input
                              id={`q-${q.globalNumber}`}
                              value={answers[q.globalNumber] || ''}
                              onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                              placeholder="Type your answer here"
                              className="text-base w-full" 
                            />
                            {renderReview(q.globalNumber)}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-700 pt-4">Questions 22-25</div>
                  <p>Look at the following people (Questions 22-25) and the list of statements.</p>
                  <p>Match each person with the correct statement.</p>
                  <p>Write the correct letter A-F in boxes 22-25 on your answer sheet.</p>
                  <div className="border rounded-lg p-3 bg-slate-50 text-sm">
                    <p>A: Filed a complaint which was never responded to</p>
                    <p>B: Broke the contract made with Carbolic Smoke Ball Company</p>
                    <p>C: Initiated a legal case</p>
                    <p>D: Described the audience of advertisement</p>
                    <p>E: Claimed that most advertisements are fraudulent</p>
                    <p>F: Treated advertisement as a type of contract</p>
                  </div>
                  {section.questions.filter((q) => q.globalNumber >= 22 && q.globalNumber <= 25).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <select
                        id={`q-${q.globalNumber}`}
                        value={answers[q.globalNumber] || ''}
                        onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                        className="w-full rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Type your answer here</option>
                        {q.options?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}

                  <div className="text-lg font-bold text-blue-700 pt-4">Question 26</div>
                  <p>Choose the correct letter, A, B, C or D.</p>
                  <p>Write your answer in box 26 on your answer sheet.</p>
                  {section.questions.filter((q) => q.globalNumber === 26).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <div className="space-y-2">
                        {q.options?.map((option, idx) => {
                          const value = option.split('.')[0].trim();
                          return (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer text-sm">
                              <input
                                type="radio"
                                name={`q-${q.globalNumber}`}
                                value={value}
                                checked={answers[q.globalNumber] === value}
                                onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                                className="w-4 h-4"
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}
                </>
              )}

              {section.id === 3 && (
                <>
                  <div className="text-lg font-bold text-blue-700">Questions 27-34</div>
                  <p>Reading Passage 3 has eight sections A-H.</p>
                  <p>Choose the correct heading for each section from the list of headings below.</p>
                  <p>Write the correct number i-x in boxes 27-34 on your answer sheet.</p>
                  <div className="border rounded-lg p-3 bg-slate-50 text-sm">
                    <p className="font-semibold">List of Headings</p>
                    <p>i: Summarising personality types</p>
                    <p>ii: Combined styles for workplace</p>
                    <p>iii: Physical explanation</p>
                    <p>iv: A lively person who encourages</p>
                    <p>v: Demanding and unsympathetic personality</p>
                    <p>vi: Lazy and careless personality</p>
                    <p>vii: The benefits of understanding communication styles</p>
                    <p>viii: Cautious and caring</p>
                    <p>ix: Factual and analytical personality</p>
                    <p>x: Self-assessment determines one’s temperament</p>
                  </div>
                  {section.questions.filter((q) => q.globalNumber >= 27 && q.globalNumber <= 34).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <select
                        id={`q-${q.globalNumber}`}
                        value={answers[q.globalNumber] || ''}
                        onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                        className="w-full rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Type your answer here</option>
                        {q.options?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}

                  <div className="text-lg font-bold text-blue-700 pt-4">Questions 35-39</div>
                  <p>Do the following statements agree with the information given in Reading Passage 3?</p>
                  <p>In boxes 35-39 on your answer sheet, write:</p>
                  <div className="border rounded-lg p-3 bg-slate-50">
                    <p>TRUE if the statement agrees with the information</p>
                    <p>FALSE if the statement contradicts the information</p>
                    <p>NOT GIVEN if there is no information on this</p>
                  </div>
                  {section.questions.filter((q) => q.globalNumber >= 35 && q.globalNumber <= 39).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <select
                        id={`q-${q.globalNumber}`}
                        value={answers[q.globalNumber] || ''}
                        onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                        className="w-full rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Type your answer here</option>
                        {q.options?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}

                  <div className="text-lg font-bold text-blue-700 pt-4">Question 40</div>
                  <p>Choose the correct letter A, B, C or D.</p>
                  <p>Write your answer in box 40 on your answer sheet.</p>
                  {section.questions.filter((q) => q.globalNumber === 40).map((q) => (
                    <div key={q.globalNumber} className="space-y-2">
                      <Label htmlFor={`q-${q.globalNumber}`} className="font-semibold text-base">
                        QUESTION {q.globalNumber}. {q.question}
                      </Label>
                      <div className="space-y-2">
                        {q.options?.map((option, idx) => {
                          const value = option.split('.')[0].trim();
                          return (
                            <label key={idx} className="flex items-center gap-2 cursor-pointer text-sm">
                              <input
                                type="radio"
                                name={`q-${q.globalNumber}`}
                                value={value}
                                checked={answers[q.globalNumber] === value}
                                onChange={(e) => handleAnswerChange(q.globalNumber, e.target.value)}
                                className="w-4 h-4"
                              />
                              {option}
                            </label>
                          );
                        })}
                      </div>
                      {renderReview(q.globalNumber)}
                    </div>
                  ))}
                </>
              )}
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
