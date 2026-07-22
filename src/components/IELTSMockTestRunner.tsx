import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/subpage/Footer';
import Listening from '@/components/test/Listening';
import Reading from '@/components/test/Reading';
import Writing, { WritingResults } from '@/components/test/Writing';
import Results from '@/components/test/Results';
import { getIELTSMockTest } from '@/data/ieltsMockTests';
import { toast } from 'sonner';

const IELTSMockTestRunner = () => {
  const { testId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const test = getIELTSMockTest(testId);
  const userEmail = (location.state as { userEmail?: string } | null)?.userEmail;
  const [step, setStep] = useState<'listening' | 'reading' | 'writing' | 'results'>('listening');
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
        {step === 'listening' && <Listening userEmail={userEmail} onComplete={results => { setListeningAnswers(results.answers); complete('Hoàn thành Listening! Bắt đầu Reading', 'reading'); }} audioUrl={test.audioUrl} answerKey={test.answerKey.listening} />}
        {step === 'reading' && <Reading userEmail={userEmail} onComplete={results => { setReadingAnswers(results.answers); complete('Hoàn thành Reading! Bắt đầu Writing', 'writing'); }} sections={test.content.reading} answerKey={test.answerKey.reading} />}
        {step === 'writing' && <Writing userEmail={userEmail} onComplete={(results: WritingResults) => { setWritingTask1(results.task1); setWritingTask2(results.task2); complete('Hoàn thành Writing! Xem kết quả', 'results'); }} content={test.content.writing} />}
        {step === 'results' && <Results testId={test.id} userEmail={userEmail} listeningAnswers={listeningAnswers} readingAnswers={readingAnswers} writingTask1={writingTask1} writingTask2={writingTask2} listeningAnswerKey={test.answerKey.listening} readingAnswerKey={test.answerKey.reading} listeningTranscript={test.content.listening} readingContent={test.content.reading} onBackToHome={() => navigate('/')} />}
      </main>
      <Footer />
    </div>
  );
};

export default IELTSMockTestRunner;
