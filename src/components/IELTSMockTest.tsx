import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/subpage/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import { ieltsMockTests } from '@/data/ieltsMockTests';

const IELTSMockTest = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="w-full max-w-5xl mx-auto px-6 py-12 flex-grow">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Thi thử IELTS</h1>
        <p className="text-lg text-muted-foreground">Chọn một đề thi để bắt đầu xác minh quyền truy cập.</p>
      </div>
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
