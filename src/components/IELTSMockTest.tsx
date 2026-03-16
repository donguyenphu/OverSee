import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/subpage/Footer";
import { checkMockTestEligibility, addToMockTested } from "@/lib/sheets";

const IELTSMockTest = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code" | "listening" | "reading" | "writing" | "results">("email");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ listening?: number; reading?: number }>({});

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === "listening" || step === "reading") {
      handleSectionSubmit();
    }
  }, [timeLeft, step]);

  const startSection = (section: "listening" | "reading" | "writing") => {
    setStep(section);
    if (section === "listening") setTimeLeft(30 * 60); // 30 minutes
    else if (section === "reading") setTimeLeft(60 * 60); // 60 minutes
    // Writing has no time limit
  };

  const handleSectionSubmit = async () => {
    if (step === "listening") {
      // Calculate listening score
      const listeningScore = Math.floor(Math.random() * 9) + 1; // Placeholder
      setResults(prev => ({ ...prev, listening: listeningScore }));
      startSection("reading");
    } else if (step === "reading") {
      // Calculate reading score
      const readingScore = Math.floor(Math.random() * 9) + 1; // Placeholder
      setResults(prev => ({ ...prev, reading: readingScore }));
      startSection("writing");
    } else if (step === "writing") {
      // Submit to Google Sheets
      await addToMockTested(email);
      // Send email with writing - TODO: implement email sending
      setStep("results");
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Định dạng email không phù hợp");
      return;
    }

    const result = await checkMockTestEligibility(email);
    if (!result.eligible) {
      setError(result.message);
      return;
    }

    setStep("code");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "OverSeechucemhoctot") {
      setStep("test");
    } else {
      setError("Mã code không hợp lệ");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-grow">
        <div className="max-w-md mx-auto">
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Thi thử IELTS</h1>
              <div>
                <Label htmlFor="email">Email của bạn</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Xác nhận</Button>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          )}

          {step === "code" && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Nhập mã code</h1>
              <div>
                <Label htmlFor="code">Mã code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Nhập mã code"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Xác nhận</Button>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          )}

          {step === "test" && (
            <div>
              <h1 className="text-2xl font-bold text-center">Bắt đầu thi thử</h1>
              <Button onClick={() => startSection("listening")} className="w-full">Bắt đầu Listening</Button>
            </div>
          )}

          {(step === "listening" || step === "reading") && (
            <div>
              <h1 className="text-2xl font-bold text-center">
                {step === "listening" ? "Listening" : "Reading"}
              </h1>
              <p className="text-center">Thời gian còn lại: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
              {/* Placeholder for questions */}
              <div className="space-y-4">
                <Input placeholder="Answer 1" />
                <Input placeholder="Answer 2" />
              </div>
              <Button onClick={handleSectionSubmit} className="w-full mt-4">Nộp bài</Button>
            </div>
          )}

          {step === "writing" && (
            <div>
              <h1 className="text-2xl font-bold text-center">Writing</h1>
              <textarea
                className="w-full h-64 p-2 border rounded"
                placeholder="Viết bài của bạn ở đây..."
              />
              <Button onClick={handleSectionSubmit} className="w-full mt-4">Nộp bài</Button>
            </div>
          )}

          {step === "results" && (
            <div>
              <h1 className="text-2xl font-bold text-center">Kết quả</h1>
              <p>Listening: {results.listening}</p>
              <p>Reading: {results.reading}</p>
              <p>Writing: Đã gửi qua email</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IELTSMockTest;