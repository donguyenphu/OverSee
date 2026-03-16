import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/subpage/Footer";

const MockTest = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Thi thử</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Chọn loại bài thi thử bạn muốn tham gia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/thi-thu/ielts"
              className="block p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-card-foreground mb-2">IELTS</h2>
              <p className="text-muted-foreground">
                Bài thi thử IELTS bao gồm Listening, Reading và Writing.
              </p>
            </Link>
            {/* Thêm các loại khác sau */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MockTest;