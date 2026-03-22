import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/subpage/Footer";
import { toast } from "sonner";
import Listening, { ListeningResults } from "@/components/test/Listening";
import Reading, { ReadingResults } from "@/components/test/Reading";
import Writing, { WritingResults } from "@/components/test/Writing";
import Results from "@/components/test/Results";

const IELTSMockTest = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code" | "listening" | "reading" | "writing" | "results">("email");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [listeningAnswers, setListeningAnswers] = useState<{ [key: number]: string }>({});
  const [readingAnswers, setReadingAnswers] = useState<{ [key: number]: string }>({});
  const [writingTask1, setWritingTask1] = useState("");
  const [writingTask2, setWritingTask2] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const successToast = (message: string) => {
    toast.success(message, {
      style: { background: '#16a34a', color: '#ffffff', border: '1px solid #15803d' }
    });
  };

  const errorToast = (message: string) => {
    toast.error(message, {
      style: { background: '#dc2626', color: '#ffffff', border: '1px solid #b91c1c' }
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập email");
      errorToast("Email không được để trống");
      return;
    }

    if (!validateEmail(email)) {
      setError("Định dạng email không phù hợp");
      errorToast("Email không hợp lệ");
      return;
    }

    // Tạm bỏ qua xác thực Google Sheets/eligible. Mọi email đều qua.
    setUserEmail(email);
    setStep("code");
    successToast("Email đã được chấp nhận (mode bypass)");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Vui lòng nhập mã code");
      errorToast("Mã code không được để trống");
      return;
    }

    // Tạm cho phép mọi code
    setStep("listening");
    successToast("Bypass code thành công! Bắt đầu thi thử");
  };

  const handleListeningComplete = (results: ListeningResults) => {
    setListeningAnswers(results.answers);
    setStep("reading");
    successToast("Hoàn thành Listening! Bắt đầu Reading");
  };

  const handleReadingComplete = (results: ReadingResults) => {
    setReadingAnswers(results.answers);
    setStep("writing");
    successToast("Hoàn thành Reading! Bắt đầu Writing");
  };

  const handleWritingComplete = (results: WritingResults) => {
    setWritingTask1(results.task1);
    setWritingTask2(results.task2);
    setStep("results");
    successToast("Hoàn thành Writing! Xem kết quả");
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="w-full max-w-screen-2xl mx-auto px-6 py-10 flex-grow">
        {/* Email Verification */}
        {step === "email" && (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                  Thi thử IELTS
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-2">
                  Bài thi Mock độc lập, chính thức
                </p>
                <p className="text-sm text-muted-foreground">
                  Thử nghiệm kỹ năng của bạn trong điều kiện thi thực
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ul className="text-sm space-y-2 text-foreground">
                      <li><strong>✓ 30 phút Listening (40 câu hỏi)</strong></li>
                      <li><strong>✓ 60 phút Reading (40 câu hỏi)</strong></li>
                      <li><strong>✓ 60 phút Writing (2 tasks)</strong></li>
                      <li><strong>✓ Reading & Listening: Hệ thống chấm điểm tự động ngay sau khi bài thi kết thúc</strong></li>
                      <li><strong>✓ Speaking & Writing: Chấm điểm trực tiếp theo hình thức buổi meet 1-1 với mentor 8.0+ IELTS</strong></li>
                    </ul>
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-semibold text-base">
                      Nhập email của bạn
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="text-base h-11"
                    />
                  </div>
                  <Button type="submit" className="w-full h-10 text-base font-semibold">
                    Tiếp tục
                  </Button>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </form>
          </div>
        )}

        {/* Code Verification */}
        {step === "code" && (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleCodeSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                  Xác nhận mã code
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Mã code đã được gửi đến {userEmail}
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900">
                      💡 Kiểm tra hộp thư Inbox hoặc Spam để tìm mã code
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="code" className="font-semibold text-base">
                      Mã code
                    </Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Nhập mã code"
                      required
                      className="text-base h-11 font-mono text-center text-lg tracking-widest"
                    />
                  </div>
                  <Button type="submit" className="w-full h-10 text-base font-semibold">
                    Xác nhận
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep("email")}
                  >
                    ← Quay lại
                  </Button>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </form>
          </div>
        )}

        {/* Listening Test */}
        {step === "listening" && (
          <Listening
            userEmail={userEmail}
            onComplete={handleListeningComplete}
            audioUrl="https://media.intergreat.com/Audio/RAT/1/Practice%20Test%206.mp3"
          />
        )}

        {/* Reading Test */}
        {step === "reading" && (
          <Reading
            userEmail={userEmail}
            onComplete={handleReadingComplete}
          />
        )}

        {/* Writing Test */}
        {step === "writing" && (
          <Writing
            userEmail={userEmail}
            onComplete={handleWritingComplete}
          />
        )}

        {/* Results */}
        {step === "results" && (
          <Results
            userEmail={userEmail}
            listeningAnswers={listeningAnswers}
            readingAnswers={readingAnswers}
            writingTask1={writingTask1}
            writingTask2={writingTask2}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IELTSMockTest;