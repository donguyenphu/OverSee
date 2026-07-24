import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/subpage/Footer';
// LRW + Res import
import Listening1 from '@/components/test/test-1/Listening';
import Listening2 from '@/components/test/test-2/Listening';
import Reading from '@/components/test/test-2/Reading';
import Writing1, { WritingResults1 } from '@/components/test/test-1/Writing';
import Writing2, { WritingResults2 } from '@/components/test/test-2/Writing';
import Results from '@/components/test/test-2/Results';
import { getIELTSMockTest } from '@/data/ieltsMockTests';
import { listeningQuestions as testTwoListeningQuestions } from '@/components/test/test-2/Listening';
import { listeningQuestions as testOneListeningQuestions } from '@/components/test/test-1/Listening';
import { toast } from 'sonner';

const IELTSMockTestRunner = () => {
  const { testId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const test = getIELTSMockTest(testId);
  const userEmail = (location.state as { userEmail?: string } | null)?.userEmail;

  const [step, setStep] = useState<
    'listening' | 'reading' | 'writing' | 'results'
  >('listening');

  const [listeningAnswers, setListeningAnswers] = useState<{ [key: number]: string }>({});
  const [readingAnswers, setReadingAnswers] = useState<{ [key: number]: string }>({});
  const [writingTask1, setWritingTask1] = useState('');
  const [writingTask2, setWritingTask2] = useState('');

  if (!test || !userEmail) {
    return <Navigate to={`/thi-thu/ielts/${testId}/dang-nhap`} replace />;
  }

  const complete = (message: string, nextStep: typeof step) => {
    setStep(nextStep);
    toast.success(message);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="w-full max-w-screen-2xl mx-auto px-6 py-10 flex-grow">

        {step === 'listening' && (
          test.id === 'ielts-mock-1' ? (
            <Listening1
              userEmail={userEmail}
              onComplete={(results) => {
                setListeningAnswers(results.answers);
                complete('Hoàn thành Listening! Bắt đầu Reading', 'reading');
              }}
              audioUrl={test.audioUrl}
              audioUrls={test.audioUrls}
              answerKey={test.answerKey.listening}
              questions={testOneListeningQuestions}
            />) : (
            <Listening2
              userEmail={userEmail}
              onComplete={(results) => {
                setListeningAnswers(results.answers);
                complete('Hoàn thành Listening! Bắt đầu Reading', 'reading');
              }}
              audioUrl={test.audioUrl}
              audioUrls={test.audioUrls}
              answerKey={test.answerKey.listening}
              questions={testTwoListeningQuestions}
            />
          )
        )}

        {step === 'reading' && (
          <Reading
            userEmail={userEmail}
            onComplete={(results) => {
              setReadingAnswers(results.answers);
              complete('Hoàn thành Reading! Bắt đầu Writing', 'writing');
            }}
            sections={test.content.reading}
            answerKey={test.answerKey.reading}
          />
        )}

        {step === 'writing' &&
          (test.id === 'ielts-mock-1' ? (
            <Writing1
              userEmail={userEmail}
              content={test.content.writing}
              onComplete={(results: WritingResults1) => {
                setWritingTask1(results.task1);
                setWritingTask2(results.task2);
                complete('Hoàn thành Writing! Xem kết quả', 'results');
              }}
            />
          ) : (
            <Writing2
              userEmail={userEmail}
              content={test.content.writing}
              onComplete={(results: WritingResults2) => {
                setWritingTask1(results.task1);
                setWritingTask2(results.task2);
                complete('Hoàn thành Writing! Xem kết quả', 'results');
              }}
            />
          ))}

        {step === 'results' && (
          <Results
            testId={test.id}
            userEmail={userEmail}
            listeningAnswers={listeningAnswers}
            readingAnswers={readingAnswers}
            writingTask1={writingTask1}
            writingTask2={writingTask2}
            listeningAnswerKey={test.answerKey.listening}
            readingAnswerKey={test.answerKey.reading}
            listeningTranscript={test.content.listening}
            readingContent={test.content.reading}
            onBackToHome={() => navigate('/')}
          />
        )}

      </main>

      <Footer />
    </div>
  );
};

export default IELTSMockTestRunner;