import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { isAnswerCorrect, listeningAnswers, readingAnswers, normalizeAnswer } from '@/data/answerKeys';
import { submitMockTestResults } from '@/lib/sheets';

interface ResultsProps {
  userEmail: string;
  listeningAnswers: { [key: number]: string };
  readingAnswers: { [key: number]: string };
  writingTask1: string;
  writingTask2: string;
  onBackToHome: () => void;
}

interface SectionScore {
  sectionNumber: number;
  correct: number;
  total: number;
}

const Results: React.FC<ResultsProps> = ({
  userEmail,
  listeningAnswers: userListeningAnswers,
  readingAnswers: userReadingAnswers,
  writingTask1,
  writingTask2,
  onBackToHome
}) => {
  const [listeningScores, setListeningScores] = useState<SectionScore[]>([]);
  const [readingScores, setReadingScores] = useState<SectionScore[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Calculate listening scores
    const listeningCalc: SectionScore[] = listeningAnswers.sections.map(section => {
      let correct = 0;
      for (const q of section.questions) {
        const userAnswer = userListeningAnswers[q.question];
        if (userAnswer && isAnswerCorrect(userAnswer, q.answers)) {
          correct++;
        }
      }
      return {
        sectionNumber: section.sectionNumber,
        correct,
        total: section.questions.length
      };
    });
    setListeningScores(listeningCalc);

    // Calculate reading scores
    const readingCalc: SectionScore[] = readingAnswers.sections.map(section => {
      let correct = 0;
      for (const q of section.questions) {
        const userAnswer = userReadingAnswers[q.question];
        if (userAnswer && isAnswerCorrect(userAnswer, q.answers)) {
          correct++;
        }
      }
      return {
        sectionNumber: section.sectionNumber,
        correct,
        total: section.questions.length
      };
    });
    setReadingScores(readingCalc);
  }, [userListeningAnswers, userReadingAnswers]);

  const getTotalListeningScore = () =>
    listeningScores.reduce((sum, s) => sum + s.correct, 0);

  const getTotalReadingScore = () =>
    readingScores.reduce((sum, s) => sum + s.correct, 0);

  const handleSubmitResults = async () => {
    try {
      setIsSubmitting(true);

      const p1 = listeningScores.find(s => s.sectionNumber === 1)?.correct ?? 0;
      const p2 = listeningScores.find(s => s.sectionNumber === 2)?.correct ?? 0;
      const p3 = listeningScores.find(s => s.sectionNumber === 3)?.correct ?? 0;
      const p4 = listeningScores.find(s => s.sectionNumber === 4)?.correct ?? 0;

      const r1 = readingScores.find(s => s.sectionNumber === 1)?.correct ?? 0;
      const r2 = readingScores.find(s => s.sectionNumber === 2)?.correct ?? 0;
      const r3 = readingScores.find(s => s.sectionNumber === 3)?.correct ?? 0;

      const result = await submitMockTestResults({
        email: userEmail,
        listeningPart1: p1,
        listeningPart2: p2,
        listeningPart3: p3,
        listeningPart4: p4,
        readingSection1: r1,
        readingSection2: r2,
        readingSection3: r3,
        writingSection1: writingTask1,
        writingSection2: writingTask2
      });

      if (result.ok) {
        toast.success('✓ Kết quả đã được lưu thành công!', {
          style: { background: '#16a34a', color: '#ffffff', border: '1px solid #15803d' }
        });
        setSubmitted(true);
      } else {
        toast.error('✗ Lỗi khi lưu kết quả: ' + (result.message || 'Unknown error'), {
          style: { background: '#dc2626', color: '#ffffff', border: '1px solid #b91c1c' }
        });
      }
    } catch (error) {
      toast.error('Lỗi khi nộp kết quả', {
        style: { background: '#dc2626', color: '#ffffff', border: '1px solid #b91c1c' }
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Test Results</h1>
        <p className="text-base md:text-lg text-muted-foreground">Kết quả IELTS Mock Test của bạn</p>
      </div>

      {/* Listening Results */}
      <Card>
        <CardHeader>
          <CardTitle>LISTENING RESULTS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {listeningScores.map((score, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-semibold">Section {score.sectionNumber}</span>
              <div className="flex items-center gap-4">
                <span className="text-lg">
                  {score.correct}/{score.total}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((score.correct / score.total) * 100)}%
                </span>
              </div>
            </div>
          ))}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total Listening Score</span>
              <span className="text-2xl font-bold text-blue-600">
                {getTotalListeningScore()}/40
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Results */}
      <Card>
        <CardHeader>
          <CardTitle>READING RESULTS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {readingScores.map((score, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
              <span className="font-semibold">Section {score.sectionNumber}</span>
              <div className="flex items-center gap-4">
                <span className="text-lg">
                  {score.correct}/{score.total}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((score.correct / score.total) * 100)}%
                </span>
              </div>
            </div>
          ))}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total Reading Score</span>
              <span className="text-2xl font-bold text-green-600">
                {getTotalReadingScore()}/40
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Results */}
      <Card>
        <CardHeader>
          <CardTitle>WRITING RESULTS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold mb-2">Task 1 (150+ words)</h3>
              <div className="bg-muted p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                  {writingTask1}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Words: {writingTask1.trim().split(/\s+/).length}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Task 2 (250+ words)</h3>
              <div className="bg-muted p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                  {writingTask2}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Words: {writingTask2.trim().split(/\s+/).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Answer Review */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            ANSWER REVIEW
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showDetails && (
          <CardContent>
            <Tabs defaultValue="listening" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="listening">Listening Details</TabsTrigger>
                <TabsTrigger value="reading">Reading Details</TabsTrigger>
              </TabsList>

              <TabsContent value="listening" className="space-y-6">
                {listeningAnswers.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-600">Section {section.sectionNumber}</h3>
                    <div className="grid gap-3">
                      {section.questions.map((q, qIdx) => {
                        const userAnswer = userListeningAnswers[q.question];
                        const isCorrect = userAnswer && isAnswerCorrect(userAnswer, q.answers);
                        return (
                          <div key={qIdx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">Q{q.question}:</span>
                              <span className="text-sm">Your answer: <strong>{userAnswer || 'No answer'}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                              {!isCorrect && (
                                <span className="text-sm text-red-600">
                                  Correct: {q.answers.join(' or ')}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="reading" className="space-y-6">
                {readingAnswers.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-600">Section {section.sectionNumber}</h3>
                    <div className="grid gap-3">
                      {section.questions.map((q, qIdx) => {
                        const userAnswer = userReadingAnswers[q.question];
                        const isCorrect = userAnswer && isAnswerCorrect(userAnswer, q.answers);
                        return (
                          <div key={qIdx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="font-medium">Q{q.question}:</span>
                              <span className="text-sm">Your answer: <strong>{userAnswer || 'No answer'}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                              {!isCorrect && (
                                <span className="text-sm text-red-600">
                                  Correct: {q.answers.join(' or ')}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={onBackToHome}
          variant="outline"
          size="lg"
        >
          Back to Home
        </Button>
        <Button
          onClick={handleSubmitResults}
          disabled={submitted || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          {isSubmitting ? 'Đang lưu...' : submitted ? '✓ Submitted' : 'Submit Results'}
        </Button>
      </div>

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-800 font-semibold">
            ✓ Kết quả của bạn đã được lưu thành công!
          </p>
          <p className="text-sm text-green-700 mt-1">
            Email xác nhận sẽ được gửi tới {userEmail}
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
