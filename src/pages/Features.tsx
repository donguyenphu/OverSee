import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, GraduationCap, Lightbulb, Video, Clock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from '@/subpage/Navigation';
import Footer from '@/subpage/Footer';

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation/>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Tính năng <span className="text-primary">Vượt trội</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Khám phá những tính năng đột phá giúp bạn học tập hiệu quả hơn
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tại sao chọn OverSee?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp nền tảng học tập toàn diện với những tính năng vượt trội
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Thư viện khóa học</h3>
                <p className="text-muted-foreground">
                  Hơn 10,000+ khóa học đa dạng từ cơ bản đến nâng cao
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Giảng viên chuyên nghiệp</h3>
                <p className="text-muted-foreground">
                  Đội ngũ giảng viên giàu kinh nghiệm và tận tâm
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Chứng chỉ uy tín</h3>
                <p className="text-muted-foreground">
                  Nhận chứng chỉ được công nhận quốc tế sau khi hoàn thành
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Học linh hoạt</h3>
                <p className="text-muted-foreground">
                  Học mọi lúc, mọi nơi trên mọi thiết bị
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tính năng bổ sung
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Video HD</h3>
                <p className="text-muted-foreground">
                  Video bài giảng chất lượng cao, hình ảnh sắc nét
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Học theo tiến độ</h3>
                <p className="text-muted-foreground">
                  Theo dõi tiến độ học tập của bạn một cách chi tiết
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Bài tập thực hành</h3>
                <p className="text-muted-foreground">
                  Hàng trăm bài tập thực hành để củng cố kiến thức
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Cộng đồng học tập</h3>
                <p className="text-muted-foreground">
                  Kết nối và học hỏi cùng hàng nghìn học viên khác
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trải nghiệm ngay hôm nay
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Đăng ký miễn phí và khám phá tất cả tính năng của EduLearn
            </p>
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Bắt đầu học ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Features;
