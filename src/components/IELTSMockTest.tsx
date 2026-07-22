import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/subpage/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Clock3, FileCheck2, Lightbulb, ShieldCheck } from 'lucide-react';
import { ieltsMockTests } from '@/data/ieltsMockTests';

const IELTSMockTest = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="w-full max-w-5xl mx-auto px-6 py-12 flex-grow">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Thi thử IELTS</h1>
        <p className="text-lg text-muted-foreground">Đọc hướng dẫn, sau đó chọn một đề thi để bắt đầu.</p>
      </div>
      <section className="mb-10 rounded-xl border bg-card p-6 shadow-sm" aria-labelledby="mock-test-guide-title">
        <div className="mb-5 flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h2 id="mock-test-guide-title" className="text-2xl font-semibold">Hướng dẫn làm bài</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-3"><Clock3 className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h3 className="font-semibold">Thời gian</h3><p className="text-sm text-muted-foreground">Listening, Reading và Writing được thực hiện lần lượt theo từng phần.</p></div></div>
          <div className="flex gap-3"><FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h3 className="font-semibold">Cách làm</h3><p className="text-sm text-muted-foreground">Điền đáp án trực tiếp trên trang và kiểm tra lại trước khi chuyển phần.</p></div></div>
          <div className="flex gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h3 className="font-semibold">Xác minh</h3><p className="text-sm text-muted-foreground">Dùng email đã được cấp quyền và mã truy cập do trung tâm cung cấp.</p></div></div>
          <div className="flex gap-3"><ClipboardList className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h3 className="font-semibold">Nộp bài</h3><p className="text-sm text-muted-foreground">Kết quả sẽ được lưu vào hệ thống sau khi bạn xác nhận nộp bài.</p></div></div>
        </div>
      </section>
      <div className="grid gap-6 md:grid-cols-2">
        {ieltsMockTests.map(test => (
          <Card key={test.id} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><ClipboardList className="h-6 w-6 text-primary" />{test.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-muted-foreground">{test.description}</p>
              <div className="text-sm text-foreground space-y-1">
                <p>Listening: 40 câu hỏi</p>
                <p>Reading: 40 câu hỏi</p>
                <p>Writing: 2 tasks</p>
              </div>
              <Button asChild className="w-full"><Link to={`/thi-thu/ielts/${test.id}/dang-nhap`}>Vào bài test</Link></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default IELTSMockTest;
