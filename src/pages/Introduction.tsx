import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, GraduationCap, Lightbulb, Video, Clock, Globe, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from '@/subpage/Navigation';
import Footer from '@/subpage/Footer';
import '../Introduction.css';

const Introduction = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      {/* Hero Banner */}
      <section className="customHeroBannerHeight relative w-full min-h-[600px] md:min-h-[750px] flex items-center overflow-hidden bg-gray-50">
        {/* Geometric Background Shapes */}
        <div className="absolute inset-0 z-0">
          {/* Dark Blue curved shape on left */}
          <div className="absolute top-0 left-0 w-[45%] h-full bg-hero-bg-blue rounded-br-[200px]" />
          {/* Orange curved shapes on right */}
          <div className="absolute top-0 right-0 w-[55%] h-[60%] bg-hero-bg-orange rounded-bl-[300px] transform translate-x-[15%]" />
          <div className="absolute bottom-0 right-0 w-[60%] h-[35%] bg-hero-bg-orange rounded-tl-[250px] transform translate-x-[10%]" />
          {/* Dark blue accent at bottom right */}
          <div className="absolute bottom-0 right-[5%] w-[20%] h-[30%] bg-hero-bg-blue rounded-tl-[150px]" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-[850px]">
            <div className="space-y-6">
              {/* Main Heading */}
              <div className="space-y-1">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-hero-title-yellow">Đồng hành vững vàng</span>
                </h1>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-hero-title-blue">Học tập nhẹ nhàng</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl font-semibold text-hero-text-black">
                Chương trình đồng hành học tập hiệu quả nhất cho học sinh Việt Nam
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white " />
                  <p className="text-base md:text-lg text-hero-text-black">
                    <span className="font-bold">Cá nhân hoá</span> lộ trình học theo năng lực và mục tiêu.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                  <p className="text-base md:text-lg text-hero-text-black">
                    <span className="font-bold">Mentor dẫn đường,</span> giúp gợi mở tư duy và đồng hành đúng lúc.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                  <p className="text-base md:text-lg text-hero-text-black">
                    <span className="font-bold">Phương pháp "Học đúng – Không học nhiều":</span> vững kỹ năng, bền tư duy, mạnh nội lực
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                  <p className="text-base md:text-lg text-hero-text-black">
                    <span className="font-bold">Hệ thống theo dõi minh bạch,</span> kết nối Mentor – Học sinh – Phụ huynh.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                  <p className="text-base md:text-lg text-hero-text-black">
                    <span className="font-bold">Đội ngũ cố vấn gồm các Giáo sư, Tiến sĩ giáo dục:</span> chuẩn khoa học, hiệu quả thực tiễn
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="pt-4">
                  <Link to="/dang-ky">
                    <Button
                      size="lg"
                      className="bg-hero-button hover:bg-hero-button/90 text-hero-text-black text-lg md:text-xl font-bold px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      Đăng ký ngay
                    </Button>
                  </Link>
                </div>
                <div className="pt-4">
                  <Link to="/cong-dong-oversee">
                    <Button
                      size="lg"
                      className=" hover:bg-hero-button/90 text-hero-text-black text-lg md:text-xl font-bold px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      Về chúng tôi
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Advisors */}
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

      {/* Situation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Bạn có đang mất động lực học tập?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Đừng lo, bạn chỉ là 1 phần nhỏ trong những trường hợp dưới đây
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-2xl transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Mất định hướng</h3>
                <p className="text-muted-foreground">
                  <strong className="customIntroductionBold">78%</strong> học sinh cho biết từng cảm thấy “<strong className="customIntroductionBold">mất định hướng</strong>” khi học, dù vẫn đi học thêm đều đặn.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-2xl transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Học không hiệu quả</h3>
                <p className="text-muted-foreground">
                  <strong className="customIntroductionBold">6/10</strong> bạn thừa nhận “học mãi mà vẫn không hiểu sâu, càng học càng nản.”
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-2xl transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Không có cải thiện</h3>
                <p className="text-muted-foreground">
                  <strong className="customIntroductionBold">Hơn 70%</strong> học sinh cấp 2–3 dành <strong className="customIntroductionBold">trên 10 giờ/tuần</strong> cho học thêm, nhưng chỉ <strong className="customIntroductionBold">1/3</strong> trong số đó thấy điểm số hoặc tư duy được cải thiện rõ rệt.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-2xl transition-shadow">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Học trong sợ hãi</h3>
                <p className="text-muted-foreground">
                  Bạn có học vì “<strong className="customIntroductionBold">sợ bị so sánh</strong>” hơn là vì muốn tiến bộ thật sự?
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why stuyding */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
              {/* Title Section */}
              <div className="md:w-1/3">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Vì sao là “Đồng hành học tập”
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Không phải “<strong className="customIntroductionBold">Học thêm</strong>” hay “<strong className="customIntroductionBold">Gia sư</strong>”?
                </p>
              </div>
              {/* Stacked Cards */}
              <div className="md:w-2/3 relative flex flex-col gap-4 items-end">
                <Card className="border-border hover:shadow-xl transition-all duration-300 hover:scale-105 w-3/4">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      <strong className="customIntroductionBold">Học đúng</strong> là yếu tố quan trọng nhất.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-xl transition-all duration-300 hover:scale-105 w-3/4">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <p className="text-muted-foreground">
                      Bạn cần <strong className="customIntroductionBold">người dẫn đường</strong>, không phải người “chỉ bài”.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-xl transition-all duration-300 hover:scale-105 w-3/4">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      Vì động lực thật sự đến từ <strong className="customIntroductionBold">bên trong</strong>, không từ điểm số hay ép buộc.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-xl transition-all duration-300 hover:scale-105 w-3/4">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-secondary" />
                    </div>
                    <p className="text-muted-foreground">
                      Vì hành trình học cần <strong className="customIntroductionBold">người hiểu bạn</strong>, không chỉ là người dạy bạn.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Title Section */}
            <div className="rounded-md px-3 py-3 m-auto mt-10 w-full text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-500">
              <h4 className="text-2xl md:text-3xl font-bold text-foreground">
                “Đồng hành học tập” là cách OverSee giúp bạn{" "}
                <br />
                <span className="text-orange-500 px-1 scalable-span">
                  tìm lại niềm vui học, làm chủ tư duy, và tiến xa bằng năng lực thật.
                </span>
              </h4>
            </div>
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
              Đăng ký ngay để tìm được người bạn đồng hành cho mình
            </p>
            <Link to="/dang-ky">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                <strong>Bắt đầu học ngay</strong>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Introduction;
