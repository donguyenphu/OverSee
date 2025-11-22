import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, GraduationCap, Lightbulb, Video, Clock, Globe, CheckCircle2, AwardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from '@/subpage/Navigation';
import Footer from '@/subpage/Footer';
import '../Introduction.css';
import HeroBannerWithNoText from '@/assets/OverSee_hero _banner_second_version.jpg';
import Advisor1 from '@/assets/Advisor1.jpg';
import Advisor2 from '@/assets/Advisor2.webp';
import FaqPagination from "@/subpage/Faqs";
import Navbar from "@/components/Navbar";
import HappyStudent from "@/subpage/HappyStudent";
import Advisor1png from "@/assets/Advisor1-removebg-preview.png";
import Advisor2png from "@/assets/Advisor2-removebg-preview.png";
import { useEffect } from "react";

const Introduction = () => {
  // ensure initial viewport scale = 0.8 on page load (for domain / Vercel deploy)
  useEffect(() => {
    const name = "viewport";
    const content = "width=device-width, initial-scale=0.8";
    const existing = document.querySelector(`meta[name="${name}"]`);
    if (existing) {
      existing.setAttribute("content", content);
    } else {
      const m = document.createElement("meta");
      m.setAttribute("name", name);
      m.setAttribute("content", content);
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      {/* Hero Banner */}
      <section className="relative w-full min-h-[650px] md:aspect-[2.13] flex items-center overflow-hidden">
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

        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={HeroBannerWithNoText}
            alt="Đồng hành vững vàng, Học tập nhẹ nhàng"
            className="w-full h-full object-contain brightness-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative md:translate-x-[-5%]">
          <div className="max-w-[800px] space-y-6">
            <div className="space-y-6 translate-y-[9%]">
              {/* Main Heading */}
              <div className="space-y-1">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="text-hero-title-yellow">Đồng hành vững vàng</span>
                </h1>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="text-hero-title-blue">Học tập nhẹ nhàng</span>
                </h1>
              </div>

              <div className="my-8">
                {/* Subtitle */}
                <p className="text-lg md:text-xl font-semibold text-hero-text-black mt-4">
                  Chương trình đồng hành học tập hiệu quả nhất cho học sinh Việt Nam
                </p>

                {/* Bullet Points */}
                <div className="space-y-4 mt-3">
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
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="pt-4">
                  <Link to="/dang-ky">
                    <Button
                      size="lg"
                      className="bg-hero-button hover:text-white text-hero-text-black text-lg md:text-xl font-bold px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      Đăng ký ngay
                    </Button>
                  </Link>
                </div>
                <div className="pt-4">
                  <Link to="/cong-dong-oversee">
                    <Button
                      size="lg"
                      className="hover:bg-hero-button/90 hover:text-white text-hero-text-black text-lg md:text-xl font-bold px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
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

      <section className="w-full justify-center py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Đại diện <span className="text-primary">đội ngũ cố vấn</span>
          </h1>
        </div>

        {/* ===== NEW: responsive MASTER CONTAINERS (lg / md+sm stacked) ===== */}
        <div className="flex flex-col gap-4 p-4">

          {/* LG layout (>=1024px) - side-by-side, text centered inside the blue strip */}
           <div className="hidden lg:flex lg:gap-6 lg:w-full">
             {/* MASTER CONTAINER 1 (lg) */}
             <div className="relative w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl bg-blue-500 h-[520px]">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[70%] bg-[#003366] z-0" />
               <div className="relative z-10 h-full flex items-stretch">
                {/* left area: wider text column (60%) with reduced padding and right padding to keep gap */}
                <div className="absolute left-0 top-[15%] w-[60%] h-[70%] p-6 md:p-8 pr-6 flex items-start text-left z-20">
                  <div className="w-full text-center">
                    <h2 className="text-4xl font-bold text-yellow-500">Giáo sư: Nguyễn Quang Hưng</h2>
                    <ul className="mt-4 text-white space-y-2 text-lg font-bold">
                      <li>• Giám đốc, Viện Khoa học Cơ bản và Ứng dụng Trường Đại học Duy Tân, Việt Nam</li>
                      <li>• Hội đồng cố vấn OverSee</li>
                    </ul>
                  </div>
                </div>

                {/* right half: large image reduced to 40% so text can expand safely */}
                <div className="ml-auto w-[40%] h-full overflow-hidden">
                   <img src={Advisor1png} alt="Giáo sư" className="w-full h-full object-cover" />
                 </div>
               </div>
             </div>
 
             {/* MASTER CONTAINER 2 (lg) */}
             <div className="relative w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl bg-blue-500 h-[520px]">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[70%] bg-[#003366] z-0" />
               <div className="relative z-10 h-full flex items-stretch">
                <div className="absolute left-0 top-[15%] w-[60%] h-[70%] p-6 md:p-8 pr-6 flex items-start text-left z-20">
                  <div className="w-full text-center">
                    <h2 className="text-4xl font-bold text-yellow-500">Tiến sĩ: Kiet Hoang</h2>
                    <ul className="mt-4 text-white space-y-2 text-lg font-bold">
                      <li>• Nghiên cứu sinh Tiến sĩ Lãnh đạo Giáo Dục, Đại học Pennsylvania (Mỹ)</li>
                      <li>• Giảng viên, Khoa Vật lý & Kỹ thuật, West Chester, PA (Mỹ)</li>
                      <li>• Hội đồng cố vấn OverSee</li>
                    </ul>
                  </div>
                </div>

                <div className="ml-auto w-[40%] h-full overflow-hidden">
                   <img src={Advisor2png} alt="Tiến sĩ" className="w-full h-full object-cover" />
                 </div>
               </div>
             </div>
           </div>
 
          {/* MD+SM layout (<1024px) - stacked full-width cards (two divs), avatar only (no large images).
              All breakpoints <1024px are treated as 'sm' */}
          <div className="flex flex-col lg:hidden w-full gap-6">
            {/* Card 1 (sm for all <1024px) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-blue-500 w-full">
              <div className="w-full bg-[#003366] py-8 px-6 flex flex-col items-center gap-4">
                <div className="w-48 h-48 rounded-full bg-orange-400 overflow-hidden flex items-center justify-center border border-black/20">
                  <img src={Advisor1png} alt="Giáo sư avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-center px-4">
                  <h2 className="text-2xl font-bold text-yellow-500">Giáo sư: Nguyễn Quang Hưng</h2>
                  <ul className="mt-4 text-white space-y-2 text-lg font-bold">
                    <li>• Giám đốc, Viện Khoa học Cơ bản và Ứng dụng Trường Đại học Duy Tân, Việt Nam</li>
                    <li>• Hội đồng cố vấn OverSee</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 (sm for all <1024px) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-blue-500 w-full">
              <div className="w-full bg-[#003366] py-8 px-6 flex flex-col items-center gap-4">
                <div className="w-48 h-48 rounded-full bg-orange-400 overflow-hidden flex items-center justify-center border border-black/20">
                  <img src={Advisor2png} alt="Tiến sĩ avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-center px-4">
                  <h2 className="text-2xl font-bold text-yellow-500">Tiến sĩ: Kiet Hoang</h2>
                  <ul className="mt-4 text-white space-y-2 text-lg font-bold">
                    <li>• Nghiên cứu sinh Tiến sĩ Lãnh đạo Giáo Dục, Đại học Pennsylvania (Mỹ)</li>
                    <li>• Giảng viên, Khoa Vật lý & Kỹ thuật, West Chester, PA (Mỹ)</li>
                    <li>• Hội đồng cố vấn OverSee</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Situation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Bạn có đang <strong className="text-primary text-3xl md:text-4xl font-bold text-foreground mb-4">mất động lực học tập?</strong>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Đừng lo, bạn chỉ là 1 phần nhỏ trong những trường hợp dưới đây
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-3/4">
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
            <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-3/4">
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
            <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-3/4">
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
            <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-3/4">
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
                  Vì sao là <strong className="text-primary text-3xl md:text-4xl font-bold text-foreground mb-4">“Đồng hành học tập”</strong>
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

      {/* Happy student features */}
      <HappyStudent />

      {/* FAQs Section */}
      <FaqPagination />
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
