import Navigation from "@/subpage/Navigation";
import Footer from "@/subpage/Footer";
import React, { useState } from "react";
import MentorRecruitSwitcher from "@/components/MentorRecruitSwitcher";
import Navbar from "@/components/Navbar";

const Recruitment = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-2 md:px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Bạn muốn trở thành <span className="text-primary">Mentor OverSee?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-primary">Liệu bạn có là một mảnh ghép của OverSee?</p>
            <div className="text-left space-y-4 text-sm sm:text-base md:text-lg font-medium bg-white/50 p-6 rounded-lg border">
              <p><strong>Đối tượng tuyển dụng:</strong> Học sinh cấp 3, sinh viên đại học, người trẻ đã tốt nghiệp.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Có thành tích học tập tốt và nền tảng kiến thức vững ở môn phụ trách.</li>
                <li>Có kinh nghiệm tự học hiệu quả hoặc từng đạt thành tích nổi bật trong học tập.</li>
                <li>Sở hữu kỹ năng giao tiếp, tư duy logic và tinh thần hỗ trợ học sinh phát triển lâu dài.</li>
                <li>Cam kết làm việc có trách nhiệm, bảo mật thông tin và tuân thủ quy trình đào tạo của OverSee.</li>
              </ul>
              <p><strong>Hoàn thành đơn dưới đây, lựa chọn chuyên môn bạn mong muốn:</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
          <section className="py-8 bg-background">
            <div className="container mx-auto px-2 md:px-4">
              <div className="max-w-5xl mx-auto ">
                <MentorRecruitSwitcher />
              </div>
            </div>
          </section>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Recruitment;
