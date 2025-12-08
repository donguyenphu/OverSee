import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, GraduationCap, Lightbulb, Video, Clock, Globe, CheckCircle2, AwardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from '@/subpage/Navigation';
import Footer from '@/subpage/Footer';
import '../Introduction.css';
import HeroBannerWithNoText from '@/assets/OverSee_hero_banner_second_version.png';
import Advisor1 from '@/assets/Advisor1.jpg';
import Advisor2 from '@/assets/Advisor2.webp';
import FaqPagination from "@/subpage/Faqs";
import Navbar from "@/components/Navbar";
import HappyStudent from "@/subpage/HappyStudent";
import Advisor1png from "@/assets/365133fc-9568-49dd-bb6f-6f8624abc246-removebg-preview.png";
import Advisor2png from "@/assets/Advisor2-removebg-preview.png";
import EventImage from '@/assets/Nguyen_Uoc_Trang_Tron.jpg';
import { useEffect } from "react";

const Introduction = () => {
  // ensure initial viewport scale = 0.8 on page load (for domain / Vercel deploy)
  useEffect(() => {
    const name = "viewport";
    const content = "width=device-width, initial-scale=1.0";
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navbar />
      {/* Hero Banner */}
      <section className="relative w-screen min-h-[650px] md:aspect-[1.78] flex items-center overflow-hidden -mx-[calc((100vw-100%)/2)]">

        {/* Large white text in top-left on md+ screens */}
        <div className="hidden md:block absolute top-16 left-10 md:left-6 z-10">
          <span className="text-white text-2xl md:text-4xl lg:text-6xl font-extrabold drop-shadow-lg select-none">
            It'll pass
          </span>
        </div>

        {/* Geometric Background Shapes */}
        <div className="absolute inset-0 z-0 block md:hidden">
          {/* Dark Blue curved shape on top left, curved to bottom right */}
          <div className="absolute top-0 left-0 w-[48%] h-[25%] bg-hero-bg-blue rounded-br-[400px] rounded-tl-[0px] rounded-tr-[0px] rounded-bl-[0px]" style={{ borderBottomRightRadius: '400px 300px' }} />
          {/* Orange curved shapes on right */}
          <div className="absolute top-0 right-0 w-[55%] h-[50%] bg-hero-bg-orange rounded-bl-[300px] transform translate-x-[15%]" />
          <div className="absolute bottom-0 right-0 w-[60%] h-[25%] bg-hero-bg-orange rounded-tl-[250px] transform translate-x-[10%]" />
        </div>


        {/* Background Image */}
        <div className="absolute inset-0 hidden md:block">
          <img
            src={HeroBannerWithNoText}
            alt="Đồng hành vững vàng, Học tập nhẹ nhàng"
            className="w-full h-full object-cover brightness-110"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent" /> */}
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 md:px-12 relative md:translate-x-[-5%]">
          <div className="max-w-[800px] space-y-0">
            <div className="space-y-4 md:space-y-6 translate-y-[9%] w-4/5">
              {/* Main Heading */}
              <div className="space-y-1.75">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.5)' }}>
                  <span className="text-hero-title-yellow">Đồng hành vững vàng</span>
                </h1>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.5)' }}>
                  <span className="text-hero-title-blue">Học tập nhẹ nhàng</span>
                </h1>
              </div>

              <div className="my-0 md:my-8">
                {/* Subtitle */}
                <p className="text-lg md:text-xl font-semibold mt-4" style={{ color: '#000000' }}>
                  Chương trình đồng hành học tập hiệu quả nhất cho học sinh Việt Nam
                </p>

                {/* Bullet Points */}
                <div className="space-y-1 md:space-y-3 lg:space-y-4 mt-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white " />
                    <p className="text-base md:text-lg" style={{ color: '#000000' }}>
                      <span className="font-bold ">Cá nhân hoá</span> lộ trình học theo năng lực và mục tiêu.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                    <p className="text-base md:text-lg" style={{ color: '#000000' }}>
                      <span className="font-bold ">Mentor dẫn đường,</span> giúp gợi mở tư duy và đồng hành đúng lúc.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                    <p className="text-base md:text-lg" style={{ color: '#000000' }}>
                      <span className="font-bold">Hệ  thống theo dõi minh bạch,</span> kết nối Mentor – Học sinh – Phụ huynh.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                    <p className="text-base md:text-lg" style={{ color: '#000000' }}>
                      <span className="font-bold">Phương pháp " Học đúng – Không học nhiều":</span> vững kỹ năng, bền tư duy, mạnh nội lực
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-7 w-7 text-hero-bg-orange flex-shrink-0 mt-0.5 fill-hero-bg-orange stroke-white" />
                    <p className="text-base md:text-lg" style={{ color: '#000000' }}>
                      <span className="font-bold">Đội ngũ cố vấn được dẫn dắt bởi các Giáo sư, Tiến sĩ giáo dục:</span> chuẩn khoa học, hiệu quả thực tiễn
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-row sm:flex-row gap-2">
                <div className="pb-3">
                  <Link to="/dang-ky">
                    <Button
                      size="lg"
                      className="bg-hero-button hover:text-white text-hero-text-black text-lg md:text-xl font-bold px-10 py-3 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      Đăng ký ngay
                    </Button>
                  </Link>
                </div>
                <div className="pb-3">
                  <Link to="/cong-dong-oversee">
                    <Button
                      size="lg"
                      className="hover:bg-hero-button/90 hover:text-white text-hero-text-black text-lg md:text-xl font-bold px-10 py-3 md:py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
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

        {/* ===== NEW: Modern Advisor Section - Redesigned ===== */}
        <div className="flex flex-col gap-8 p-4 max-w-7xl mx-auto">

          {/* Modern Grid Layout - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

            {/* Advisor 1 - Professor Nguyen Quang Hung */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')" }} />

              <div className="relative p-8 md:p-10 flex flex-col h-full min-h-[480px]">
                {/* Avatar Circle */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-400/20 group-hover:scale-110 transition-transform duration-500">
                    <img src={Advisor1png} alt="Giáo sư Nguyễn Quang Hưng" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center space-y-5">
                  <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3">
                    Giáo sư: Nguyễn Quang Hưng
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-4" />
                  <ul className="text-white space-y-3 sm:text-xl md:text-2xl leading-relaxed font-bold">
                    <li className="flex items-center gap-3 justify-center">
                      {/* <span className="text-yellow-400 mt-1 h-4 w-4 inline-flex justify-center items-center text-center">●</span> */}
                      <span className="text-center">- Giám đốc Viện Khoa học Cơ bản và Ứng dụng Trường Đại học Duy Tân, Việt Nam</span>
                    </li>
                    <li className="flex items-center gap-3 justify-center">
                      {/* <span className="text-yellow-400 mt-1 h-4 w-4 inline-flex justify-center items-center text-center">●</span> */}
                      <span className="text-center">- Viện trưởng Viện Nghiên cứu Khoa học Cơ bản và Ứng dụng (IFAS)</span>
                    </li>
                    <li className="flex items-center gap-3 justify-center">
                      {/* <span className="text-yellow-400 mt-1 h-4 w-4 inline-flex justify-center items-center text-center">●</span> */}
                      <span className="text-center">- Hội đồng cố vấn OverSee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Advisor 2 - Dr. Kiet Hoang */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')" }} />

              <div className="relative p-8 md:p-10 flex flex-col h-full min-h-[480px]">
                {/* Avatar Circle */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-400/20 group-hover:scale-110 transition-transform duration-500">
                    <img src={Advisor2png} alt="Tiến sĩ Hoàng Anh Tuấn Kiệt" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center space-y-5">
                  <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3">
                    Tiến sĩ: Hoàng Anh Tuấn Kiệt
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-4" />
                  <ul className="text-white space-y-3 sm:text-xl md:text-2xl leading-relaxed font-bold">
                    <li className="flex items-center gap-3 justify-center">
                      {/* <span className="text-yellow-400 mt-1">●</span> */}
                      <span className="text-center">- Nghiên cứu sinh Tiến sĩ Lãnh đạo Giáo Dục, Đại học Pennsylvania (Mỹ)</span>
                    </li>
                    <li className="flex items-center gap-3 justify-center">
                      {/* <span className="text-yellow-400 mt-1">●</span> */}
                      <span className="text-center">- Giảng viên Khoa Vật lý & Kỹ thuật, West Chester, PA (Mỹ)</span>
                    </li>
                    <li className="flex items-center gap-3 justify-center">
                      {/* <span className="text-yellow-400 mt-1">●</span> */}
                      <span className="text-center">- Hội đồng cố vấn OverSee</span>
                    </li>
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
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Bạn có đang <strong className="text-primary text-4xl md:text-6xl font-bold text-foreground mb-4">mất động lực học tập?</strong>
            </h2>
            <p className="text-3xl md:text-3xl text-muted-foreground max-w-2xl mx-auto font-bold">
              Đừng lo, bạn chỉ là 1 phần nhỏ trong những trường hợp dưới đây
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Mất định hướng</h3>
                <p className="text-muted-foreground">
                  <strong className="customIntroductionBold">78%</strong> học sinh cho biết từng cảm thấy “<strong className="customIntroductionBold">mất động lực học do không thấy điểm số cải thiện</strong>” dù vẫn đi học thêm đều đặn.
                </p>
              </CardContent>
            </Card>
            {/* <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Học không hiệu quả</h3>
                <p className="text-muted-foreground">
                  <strong className="customIntroductionBold">6/10</strong> bạn thừa nhận “học mãi mà vẫn không hiểu sâu, càng học càng nản.”
                </p>
              </CardContent>
            </Card> */}
            <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Không có cải thiện</h3>
                <p className="text-muted-foreground">
                  <strong className="customIntroductionBold">70%+</strong> học sinh cấp 2–3 dành <strong className="customIntroductionBold">trên 10 giờ/tuần</strong> cho học thêm, nhưng chỉ <strong className="customIntroductionBold">1/3</strong> trong số đó thấy <strong className="customIntroductionBold">điểm số được cải thiện rõ rệt.</strong>
                </p>
              </CardContent>
            </Card>
            <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
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
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 text-center">
                Vì sao nên chọn <span className="text-primary">“Cố vấn học tập”</span><br />
                <span className="text-lg font-normal block mt-2">thay vì <strong>“Học thêm”</strong> hay <strong>“Gia sư”</strong> khi mất động lực học?</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 shadow-2xl text-base md:text-lg animate-fadein bg-white/80 backdrop-blur-md" style={{ animation: 'fadein 1.2s' }}>
                <thead>
                  <tr>
                    <th className="bg-gradient-to-r from-gray-100 via-yellow-100 to-blue-100 font-bold border px-4 py-3 transition-all duration-300 hover:bg-yellow-200 w-1/4">Tiêu chí</th>
                    <th className="bg-gradient-to-br from-yellow-200 to-yellow-300 font-bold border px-4 py-3 transition-all duration-300 hover:bg-yellow-300  w-1/4">Trung tâm học thêm</th>
                    <th className="bg-gradient-to-br from-orange-200 to-orange-300 font-bold border px-4 py-3 transition-all duration-300 hover:bg-orange-300  w-1/4">Gia sư truyền thống</th>
                    <th className="bg-gradient-to-br from-blue-200 to-blue-300 font-bold border px-4 py-3 transition-all duration-300 hover:bg-blue-300  w-1/4">Tổ chức giáo dục OverSee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition-all duration-300">
                    <td className="bg-gray-50 border px-4 py-3 font-semibold rounded-bl-2xl">Vai trò người dạy</td>
                    <td className="border px-4 py-3">Truyền đạt kiến thức</td>
                    <td className="border px-4 py-3">Giúp làm bài, củng cố</td>
                    <td className="border px-4 py-3">Hướng dẫn tư duy, đồng hành lâu dài</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-all duration-300">
                    <td className="bg-gray-50 border px-4 py-3 font-semibold">Cách học</td>
                    <td className="border px-4 py-3">Theo giáo trình cố định</td>
                    <td className="border px-4 py-3">Linh hoạt nhưng thiếu hệ thống</td>
                    <td className="border px-4 py-3">Cá nhân hoá theo mục tiêu của học sinh</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-all duration-300">
                    <td className="bg-gray-50 border px-4 py-3 font-semibold">Động lực học</td>
                    <td className="border px-4 py-3">Ngoại lực, điểm số</td>
                    <td className="border px-4 py-3">Có sức nhắc nhở, động lực thường xuyên</td>
                    <td className="border px-4 py-3">Nội lực, học vì hiểu giá trị của việc học</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-all duration-300">
                    <td className="bg-gray-50 border px-4 py-3 font-semibold rounded-bl-2xl">Tương tác phụ huynh</td>
                    <td className="border px-4 py-3">Gần như không</td>
                    <td className="border px-4 py-3">Thông báo kết quả theo hệ thống dạy học sinh</td>
                    <td className="border px-4 py-3 rounded-br-2xl">Cập nhật định kỳ, cùng tạo môi trường học đúng</td>
                  </tr>
                </tbody>
              </table>
              <style>{`
                @keyframes fadein {
                  from { opacity: 0; transform: translateY(40px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>

      {/* Happy student features */}
      <HappyStudent />

      {/* FAQs Section */}
      <FaqPagination />

      {/* OverSee sẻ chia */}
      <section
        className="py-20 bg-gradient-to-br from-secondary/4 to-primary/4 bg-gradient-to-br from-secondary/5 to-primary/5"
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-3 items-start">
            {/* LEFT: Title + lead */}
            <div className="lg:col-span-1 flex flex-col justify-center">
              <div className="bg-card/80 p-6 rounded-2xl shadow-md border border-border">
                <p className="text-6xl sm:text-7xl font-bold text-foreground leading-tight mb-2"><strong className="text-6xl sm:text-7xl font-bold text-orange-500 leading-tight">OverSee</strong> sẻ chia</p>
                <p className="text-2xl sm:text-3xl font-semibold text-primary mb-4">Nguyện ước Trăng tròn</p>
                <p className="text-xl sm:text-xl text-foreground/90 font-bold leading-relaxed">
                  Với mong muốn lan tỏa giá trị giáo dục và yêu thương, OverSee đã thực hiện dự án “Nguyện ước Trăng tròn” — cung cấp hơn <span className="text-primary">1500 suất ăn trưa dinh dưỡng</span> cho trẻ em có hoàn cảnh khó khăn tại khu đô thị, bắt đầu từ huyện An Lão, Hải Phòng nhân dịp Tết Trung Thu.
                </p>
                <div className="mt-4 flex gap-3">
                  <a href="https://www.youtube.com/watch?v=tUd5xeaHcFc" className="inline-block px-4 py-2 bg-primary text-white rounded-md text-sm font-medium">Xem video</a>
                  <a href="https://www.facebook.com/share/p/1CNKuPH2s9/?mibextid=wwXIfr" target="_blank" rel="noreferrer noopener" className="inline-block px-4 py-2 border border-primary text-primary rounded-md text-sm font-semibold">Xem bài viết</a>
                </div>
              </div>
              <div className="hidden lg:block my-8">
                <img
                  src={EventImage}
                  alt="Nguyện ước Trăng tròn"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>

            {/* RIGHT: Stats + bullets */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-xl items-center text-center w:1/3 justify-center gap-2 border border-border flex lg: flex-row sm:flex-col">
                  <div className="text-3xl font-extrabold text-primary">1500+</div>
                  <div className="text-md text-muted-foreground mt-1 font-bold text-black">suất ăn trưa</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl items-center text-center w:1/3 justify-center gap-2 border border-border flex lg: flex-row sm:flex-col">
                  <div className="text-3xl font-extrabold text-primary">42</div>
                  <div className="text-md text-muted-foreground mt-1 font-bold text-black">tình nguyện viên</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl items-center text-center w:1/3 justify-center gap-2 border border-border flex lg: flex-row sm:flex-col">
                  <div className="text-3xl font-extrabold text-primary">100%</div>
                  <div className="text-md text-muted-foreground mt-1 font-bold text-black">tài trợ từ OverSee</div>
                </div>
              </div>

              <div className="bg-card/80 p-5 rounded-xl border border-border">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                    <p className="text-md text-foreground font-bold">Khác với nhiều hoạt động thiện nguyện hướng về vùng cao, “Nguyện ước Trăng tròn” chọn nhìn về những đứa trẻ nơi phố thị – nơi nghèo đói đôi khi bị lãng quên giữa nhịp sống hiện đại.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                    <p className="text-md text-foreground font-bold">Dự án được tài trợ 100% từ lợi nhuận của OverSee và thực hiện bởi đội ngũ 42 tình nguyện viên cùng đối tác địa phương.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary h-5 w-5 mt-1 flex-shrink-0" />
                    <p className="text-md text-foreground font-bold">“Nguyện ước Trăng tròn” không chỉ mang đến những bữa ăn đủ đầy, mà còn là lời nhắc về sự thấu hiểu và sẻ chia thật sự bắt đầu từ việc lắng nghe nhu cầu của cộng đồng.</p>
                  </li>
                </ul>
              </div>

              {/* Video tổng quan sự kiện -> render as single card with same dimensions */}
              <div>
                <Card className="rounded-lg shadow-lg overflow-hidden">
                  <CardHeader className="pt-4 px-5">
                    <div className="text-2xl text-foreground font-bold">Video tổng quan sự kiện</div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Video fills the card width to match bullets block (which uses p-5) */}
                    <iframe
                      className="w-full h-full aspect-video"
                      src="https://www.youtube.com/embed/tUd5xeaHcFc"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="YouTube Video"
                    ></iframe>
                  </CardContent>
                </Card>
              </div>

              {/* Default placeholder image */}
              {/* <div>
                          <Card className="rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-orange-50">
                            <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                              <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-primary/20 to-orange-400/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <h3 className="text-2xl font-bold text-foreground mb-2">Hình ảnh sự kiện</h3>
                              <p className="text-muted-foreground">Các khoảnh khắc đẹp từ "Nguyện ước Trăng tròn"</p>
                            </CardContent>
                          </Card>
                        </div> */}
            </div>
          </div>

          <style>{`
                      @media (max-width: 1024px) {
                        .max-w-6xl { padding-left: 1rem; padding-right: 1rem; }
                      }
                    `}</style>
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
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Introduction;
