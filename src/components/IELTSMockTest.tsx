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
import { NotebookPen, LeafyGreenIcon, MessageCircleWarning } from 'lucide-react';
import { checkMockTestEligibility } from "@/lib/sheets";

const IELTSMockTest = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code" | "listening" | "reading" | "writing" | "results">("email");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
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
    setIsCheckingEmail(true);

    if (!email.trim()) {
      setError("Vui lòng nhập email");
      errorToast("Email không được để trống");
      setIsCheckingEmail(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Định dạng email không phù hợp");
      errorToast("Email không hợp lệ");
      setIsCheckingEmail(false);
      return;
    }

    try {
      const result = await checkMockTestEligibility(email);
      
      if (result.eligible) {
        setUserEmail(email);
        setStep("code");
        successToast("Email thỏa mãn. Hãy nhập mã code");
      } else {
        setError(result.message);
        errorToast(result.message);
      }
    } catch (err: any) {
      setError("Lỗi kiểm tra email: " + err.message);
      errorToast("Lỗi kiểm tra email");
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Vui lòng nhập mã code");
      errorToast("Mã code không được để trống");
      return;
    }

    if (code !== "OverSeechucemhoctot") {
      setError("Mã code không chính xác");
      errorToast("Mã code không chính xác");
      return;
    }

    setStep("listening");
    successToast("Mã code chính xác! Bắt đầu thi thử");
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
          <div className="max-w-full mx-auto">
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
                  Thi thử IELTS
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-2">
                  Bài thi Mock độc lập, chính thức
                </p>
                <p className="text-lg text-muted-foreground">
                  Đánh giá kỹ năng của bạn trong điều kiện thi thực
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md opacity-90 transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:opacity-100">
                  <span className="text-2xl space-y-2 text-foreground font-semibold text-orange-500">* Phần thi trên website OverSee:</span>
                  <ul className="text-md space-y-2 text-foreground leading-[26px]">
                    <li><strong>- Kỹ năng Listening, Reading, Writing sẽ thi trên website này. Các bài thi liên tục theo đúng thứ tự trên, với giao diện mô phỏng 90% thi thật.</strong></li>
                    <li><strong>- Học viên nhập email sau đó nhập code trung tâm cung cấp để bắt đầu bài thi.</strong></li>
                    <li><strong>- Vì đây là bài thi mô phỏng thi thật nên một khi bắt đầu, học viên sẽ thi liên tục 3 kỹ năng.</strong></li>
                    <li><strong>- Không có thời gian giải lao giữa các kỹ năng, không thể dừng bài thi khi chưa nộp bài.</strong></li>
                    <li><strong>- Mỗi học viên được làm bài thi 1 lần duy nhất.</strong></li>
                    <li><strong>- Không sử dụng tài liệu, từ điển để đảm bảo kết quả chính xác nhất.</strong></li>
                    <li><strong>- Sau khi đã thi xong 3 kỹ năng, học viên nhắn cho page OverSee để nhận link buổi thi 1-1 cùng mentor</strong></li>
                  </ul>
                </div>
                {/* input đăng ký thi thử */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md opacity-90 transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:opacity-100">
                  <span className="text-2xl space-y-2 text-foreground font-semibold text-orange-500">* Phần thi 1-1 cùng mentor:</span>
                  <ul className="text-md space-y-2 text-foreground leading-[23px]">
                    <li><strong>- Nội dung: </strong></li>
                    <ul className="text-md space-y-2 text-foreground">
                      <li><strong>+ Mentor phân tích điểm mạnh, điểm yếu, cách khắc phục và chiến thuật làm bài hay đối với kỹ năng Reading và Listening đã thi.</strong></li>
                      <li><strong>+ Chấm chữa chi tiết bài thi Writing</strong></li>
                      <li><strong>+ Thi thử và chấm chữa chi tiết kỹ năng Speaking. </strong></li>
                    </ul>
                    <li><strong>- Thời gian: 02 tiếng</strong></li>
                    <li><strong>- Vì đây là bài thi mô phỏng thi thật nên một khi bắt đầu, học viên sẽ thi liên tục 3 kỹ năng.</strong></li>
                    <li><strong>- Hình thức: Online qua nền tảng Google Meet</strong></li>
                    <li><strong>- Lưu ý:</strong></li>
                    <ul className="text-md space-y-2 text-foreground">
                      <li><strong>+ Chuẩn bị sẵn bút chì, giấy nháp cho phần thi Speaking</strong></li>
                      <li><strong>+ Bật cam, mic trong suốt quá trình thi.</strong></li>
                      <li><strong>+ Không sử dụng tài liệu, từ điển để đảm bảo kết quả chính xác nhất.</strong></li>
                    </ul>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 mb-6">
                <div>
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md opacity-90 transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:opacity-100">
                          <ul className="text-md space-y-2 text-foreground">
                            <li className="flex items-center gap-2">
                              <LeafyGreenIcon className="w-6 h-6 text-green-600 shrink-0" />
                              <strong>30 phút Listening (40 câu hỏi)</strong>
                            </li>
                            <li className="flex items-center gap-2">
                              <LeafyGreenIcon className="w-6 h-6 text-green-600 shrink-0" /> 
                              <strong>60 phút Reading (40 câu hỏi)</strong>
                            </li>
                            <li className="flex items-center gap-2">
                              <LeafyGreenIcon className="w-6 h-6 text-green-600 shrink-0" />
                              <strong>60 phút Writing (2 tasks)</strong>
                            </li>
                            <li className="flex items-center gap-2">
                              <LeafyGreenIcon className="w-6 h-6 text-green-600 shrink-0" />
                              <strong>Reading & Listening: Hệ thống chấm điểm tự động ngay sau khi bài thi kết thúc</strong>
                            </li>
                            <li className="flex items-center gap-2">
                              <LeafyGreenIcon className="w-6 h-6 text-green-600 shrink-0" />
                              <strong>Speaking & Writing: Chấm trực tiếp theo hình thức buổi meet 1-1 với mentor</strong>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md opacity-90 transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:opacity-100">
                          <span className="text-2xl space-y-2 text-foreground font-semibold text-orange-500">* Hướng dẫn chức năng highlight</span>
                          <ul className="text-md space-y-2 text-foreground mt-2">
                            <li className="flex items-center gap-2">
                              <NotebookPen className="w-6 h-6 text-blue-600 shrink-0" />
                              <strong>Di con trỏ chuột theo đoạn văn bản bạn muốn tô đậm</strong>
                            </li>
                            <li className="flex items-center gap-2">
                              <NotebookPen className="w-6 h-6 text-blue-600 shrink-0" />
                              <strong>Sau khi chọn đoạn văn bản, thả tay khỏi chuột hoặc pad, màn hình sẽ xuất hiện 2 nút Highlight và Remove</strong>
                            </li>
                            <li className="flex items-center gap-2">
                              <NotebookPen className="w-6 h-6 text-blue-600 shrink-0" />
                              <strong>Nhấn Highlight để tô đậm đoạn văn bản, Remove để xóa dấu (ở trên cùng passage có nút Clear all để xóa hết dấu của passage đó)</strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="font-semibold text-xl">
                          Nhập email của bạn
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="text-base h-10 mt-2"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isCheckingEmail}
                        className="w-full h-10 text-xl font-semibold"
                      >
                        {isCheckingEmail ? "Đang kiểm tra..." : "Tiếp tục"}
                      </Button>
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
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
                    <p className="text-lg text-amber-900 flex items-center gap-2">
                      <MessageCircleWarning className="h-20 w-20" /> Hãy nhập code đã được trung tâm cung cấp để bắt đầu bài thi thử. Nếu bạn chưa có code, hãy nhắn tin cho page trung tâm để nhận được code thi thử.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="code" className="font-semibold text-lg">
                      Mã code
                    </Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Nhập mã code tại đây"
                      required
                      className="text-lg h-11 font-roboto text-center text-lg tracking-widest mt-2"
                    />
                  </div>
                  <Button type="submit" className="w-full h-10 text-lg font-semibold">
                    Xác nhận
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 text-lg font-semibold"
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