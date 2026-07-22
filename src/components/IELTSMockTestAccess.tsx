import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/subpage/Footer';
import { toast } from 'sonner';
import { checkMockTestEligibility } from '@/lib/sheets';
import { getIELTSMockTest } from '@/data/ieltsMockTests';

const IELTSMockTestAccess = () => {
  const ENABLE_ACCESS_VALIDATION = true;
  const { testId = '' } = useParams();
  const test = getIELTSMockTest(testId);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [error, setError] = useState('');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const notifyError = (message: string) => toast.error(message);

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsCheckingEmail(true);

    if (ENABLE_ACCESS_VALIDATION) {
      if (!email.trim()) {
        setError('Vui lòng nhập email');
        notifyError('Email không được để trống');
        setIsCheckingEmail(false);
        return;
      }
      if (!validateEmail(email)) {
        setError('Định dạng email không phù hợp');
        notifyError('Email không hợp lệ');
        setIsCheckingEmail(false);
        return;
      }

      try {
        const result = await checkMockTestEligibility(testId, email);
        if (!result.eligible) {
          setError(result.message);
          notifyError(result.message);
          return;
        }
      } catch (requestError: unknown) {
        const message = requestError instanceof Error ? requestError.message : 'Không xác định';
        setError('Lỗi kiểm tra email: ' + message);
        notifyError('Lỗi kiểm tra email');
        return;
      } finally {
        setIsCheckingEmail(false);
      }
    }

    setIsCheckingEmail(false);
    setStep('code');
    toast.success('Email được chấp nhận');
  };

  const handleCodeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (ENABLE_ACCESS_VALIDATION) {
      if (!code.trim()) {
        setError('Vui lòng nhập mã code');
        notifyError('Mã code không được để trống');
        return;
      }
      if (code !== 'OverSeechucemhoctot') {
        setError('Mã code không chính xác');
        notifyError('Mã code không chính xác');
        return;
      }
    }
    navigate(`/thi-thu/ielts/${testId}/lam-bai`, { state: { userEmail: email.trim() } });
  };

  if (!test) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="w-full max-w-xl mx-auto px-6 py-16 flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{test.title}</h1>
          <p className="text-muted-foreground">{step === 'email' ? 'Nhập email để xác minh quyền làm đề thi này.' : 'Nhập mã code trung tâm cung cấp để bắt đầu.'}</p>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="font-semibold text-lg">Email của bạn</Label>
                  <Input id="email" type="text" value={email} onChange={event => setEmail(event.target.value)} placeholder="Nhập email bất kỳ để test" className="mt-2" />
                </div>
                <Button type="submit" disabled={isCheckingEmail} className="w-full">{isCheckingEmail ? 'Đang kiểm tra...' : 'Tiếp tục'}</Button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="code" className="font-semibold text-lg">Mã code</Label>
                  <Input id="code" value={code} onChange={event => setCode(event.target.value)} placeholder="Nhập mã bất kỳ để test" className="mt-2 text-center tracking-widest" />
                </div>
                <Button type="submit" className="w-full">Bắt đầu bài thi</Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => setStep('email')}>Quay lại</Button>
              </form>
            )}
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default IELTSMockTestAccess;
