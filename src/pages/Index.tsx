import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, GraduationCap, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/subpage/Navigation";
import Footer from "@/subpage/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Nâng cao kiến thức, <span className="text-primary">Thay đổi tương lai</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Khám phá hàng ngàn khóa học trực tuyến chất lượng cao với đội ngũ giảng viên chuyên nghiệp. 
              Học mọi lúc, mọi nơi với EduLearn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Bắt đầu học ngay
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Xem khóa học
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Miễn phí dùng thử</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Chứng chỉ quốc tế</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sẵn sàng bắt đầu hành trình học tập?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Đăng ký ngay hôm nay và nhận ưu đãi 30% cho khóa học đầu tiên
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-8">
              Đăng ký miễn phí ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Index;
