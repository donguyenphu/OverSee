import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, User, Mail, Phone, Target, School, Workflow } from "lucide-react";
import Navbar from "@/components/Navbar";
import Mentor1 from '@/assets/1.jpg';
import Mentor2 from '@/assets/2.jpg';
import Mentor3 from '@/assets/3.jpg';
import Mentor4 from '@/assets/4.jpg';
import Footer from "@/subpage/Footer";
import '../Introduction.css';
import { BookOpen, Users, Award, GraduationCap, Lightbulb, Video, Clock, Globe, CheckCircle2, AwardIcon } from "lucide-react";
import VideoOverSee from '@/assets/Oversee_Video.mp4';
import EventImage from '@/assets/Nguyen_Uoc_Trang_Tron.jpg';
import s1 from '@/assets/s1.png';
import s2 from '@/assets/s2.png';
import s3 from '@/assets/s3.png';
import s4 from '@/assets/s4.png';
import s5 from '@/assets/s5.png';
import s6 from '@/assets/s6.png';
import s7 from '@/assets/s7.png';

interface Profile {
  id: number;
  name: string;
  expertise: JSX.Element;
  experience: JSX.Element;
  goals: string;
  mentor: string;
}

const sampleProfiles: Profile[] = [
  {
    id: 1,
    name: "Mentor môn Sinh : Lê Hoàng Kim Khánh",
    expertise: (
      <ul className="leading-normal list-circle pl-5 text: black">
        <li>- Lớp chuyên Sinh niên khoá 2023-2026, trường THPT Chuyên Trần Phú</li>
        <li>- Mentor hướng dẫn môn Sinh chuyên</li>
      </ul>
    ),
    experience: (
      <ul className="leading-normal list-circle pl-5">
        <li>- Thủ khoa kỳ thi học sinh giỏi Quận Ngô Quyền (lớp 9)</li>
        <li>- Giải Nhì hsg môn Sinh cấp thành phố (lớp 9)</li>
        <li>- Giải Nhất cấp Quận môn KHTN bằng Tiếng Anh (lớp 9) </li>
        <li>- Giải KK cấp thành phố môn KHTN bằng Tiếng Anh (lớp 9)</li>
        <li>- Điểm thi vào 10 môn Sinh: 6,63 </li>
        <li>- Điểm trung bình môn Sinh chuyên lớp 10, 11: 9.7</li>
        <li>- Giải Ba kỳ thi chọn học sinh giỏi Quốc Gia môn Sinh học cấp thành phố Bảng A (lớp 11) </li>
        <li>- Giải Nhì kỳ thi HSG môn Sinh bằng Tiếng Anh cấp thành phố (lớp 11)</li>
      </ul>
    ),
    goals: "“One step at a time”",
    mentor: Mentor1
  },
  {
    id: 2,
    name: "Mentor IELTS : Nguyễn Hoàng Nam",
    expertise: (
      <ul className="leading-normal list-circle pl-5">
        <li>- Cựu học sinh lớp  chuyên Nga.</li>
        <li>- Mentor hướng dẫn chứng chỉ IELTS chuyên về kỹ năng Speaking</li>
      </ul>
    ),
    experience: (
      <ul className="leading-normal list-circle pl-5">
        <li>- 8.0 IELTS (Listening: 9, Speaking: 8, Reading: 8, Writing: 7)</li>
        <li>- Một năm kinh nghiệm giảng dạy IELTS</li>
        <li>- Mentor đồng hành cùng nhiều học viên trong giai đoạn cấp tốc trước thi</li>
        <li>- Sử dụng và giao tiếp thành thạo bằng Tiếng Anh.</li>
      </ul>
    ),
    goals: (
      `“If you never bleed,
        you're never gonna grow”`
    ),
    mentor: Mentor2
  },
  {
    id: 3,
    name: "Mentor SAT : Nguyễn Hữu Nam",
    expertise: (
      <ul className="leading-normal list-circle pl-5">
        <li>Mentor hướng dẫn chứng chỉ SAT </li>
        <li>Phụ trách chính mảng đồng hành cùng học viên cần tăng điểm trong thời gian ngắn </li>
      </ul>
    ),
    experience: (
      <ul className="leading-normal list-circle pl-5">
        <li>- 1540 SAT (790: Math, 750: RW)</li>
        <li>- 8.0 IELTS</li>
        <li>- Có kinh nghiệm đồng hành 1-1 cùng học viên  tăng điểm cấp tốc trong thời gian ngắn (1.5 đến 3 tháng)</li>
        <li>- Nhiệt tình, vui vẻ, trách nhiệm trong công việc</li>
        <li>- Đặc biệt thích hợp đồng hành với học viên có khả năng tự học</li>
      </ul>
    ),
    goals: (
      `“Không có việc gì khó
        Chỉ sợ lòng không bền”`
    ),
    mentor: Mentor3
  },
  {
    id: 4,
    name: "Mentor IELTS : Nguyễn Nhật Nam",
    expertise: (
      <ul className="leading-normal list-circle pl-5">
        <li>Cựu học sinh Chuyên Anh 1</li>
        <li>Mentor phụ trách hướng dẫn chứng chỉ IELTS chuyên về mảng Writing</li>
      </ul>
    ),
    experience: (
      <ul className="leading-normal list-circle pl-5">
        <li>- 8.0 IELTS</li>
        <li>- 7.15 điểm thi Chuyên Anh</li>
        <li>- Chấm chữa bài chi tiết, khả năng truyền đạt tốt, học viên dễ hiểu bài.</li>
        <li>- Học viên cần có tinh thần tự giác và cầu tiến để có thể làm việc tốt với Mentor.</li>
      </ul>
    ),
    goals: "“You only live once”",
    mentor: Mentor4
  }
];

const Profiles = () => {
  // Allow multiple mentor profiles expanded at once
  const [expandedProfiles, setExpandedProfiles] = useState<number[]>([]);
  // Track expanded share paragraphs
  const [expandedShareIds, setExpandedShareIds] = useState<number[]>([]);
  // Lightbox state for share images (id, src)
  const [lightbox, setLightbox] = useState<{ id: number; src: string } | null>(null);
  // Lens position state for magnifier (null when not active)
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const lensSize = 140; // lens square size
  const zoomFactor = 2.2; // magnification level
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgDims, setImgDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const toggleProfile = (id: number) => {
    setExpandedProfiles(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleShareParagraph = (id: number) => {
    setExpandedShareIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleShare = (id: number) => {
    setExpandedShareIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Facebook embed component (load SDK and render fb-post)
  function FacebookEmbed({ postUrl }: { postUrl: string }) {
    useEffect(() => {
      const id = "facebook-jssdk";
      const existing = document.getElementById(id);

      // Ensure fbAsyncInit exists so FB.init is called if SDK loads
      (window as any).fbAsyncInit = () => {
        try {
          (window as any).FB.init?.({ xfbml: true, version: "v20.0" });
        } catch (e) {
          /* noop */
        }
      };

      if (!existing) {
        const script = document.createElement("script");
        script.id = id;
        // use Vietnamese locale for better localization of embeds
        script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v20.0";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          try {
            (window as any).FB?.XFBML.parse();
          } catch (e) {
            /* noop */
          }
        };
        document.body.appendChild(script);
      } else {
        // SDK already present -> parse current node(s)
        try {
          (window as any).FB?.XFBML.parse();
        } catch (e) {
          /* noop */
        }
      }

    }, [postUrl]);

    return (
      <div className="w-full bg-card rounded-lg overflow-hidden shadow-inner" style={{ minHeight: 320 }}>
        <div
          className="fb-post"
          data-href={postUrl}
          data-width="500"
          data-show-text="true"
        />
      </div>
    );
  }

  // Lazy YouTube: show thumbnail + play button, insert iframe only after click
  function LazyYouTube({ videoId, title }: { videoId: string; title?: string }) {
    const [playing, setPlaying] = useState(false);
    const thumb = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return (
      <div className="w-full">
        {!playing ? (
          <div className="relative rounded-lg overflow-hidden shadow-lg bg-black">
            <img src={thumb} alt={title || "YouTube thumbnail"} className="w-full h-auto object-cover" />
            <button
              aria-label="Play video"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-primary/90 text-white rounded-full p-4 shadow-lg">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                </svg>
              </div>
            </button>
            <div className="p-3 text-center text-sm text-muted-foreground">Nhấn để phát video (nếu bị chặn, mở YouTube)</div>
            <div className="text-center pb-3">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-primary underline"
              >
                Xem video trên YouTube
              </a>
            </div>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ paddingTop: "56.25%" }}>
            <iframe
              title={title || "YouTube video"}
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto">
          <section
            className="pt-0 pb-20 w-full bg-gradient-to-br from-secondary/5 to-primary/5"
            style={{
              width: "100vw",
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
            }}
          >
            <div className="container mx-auto px-4 py-20">
              <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                  <span className="text-primary">Mentor OverSee</span> có gì đặc biệt?
                </h1>
                {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Đừng lo, bạn chỉ là 1 phần nhỏ trong những trường hợp dưới đây
                </p> */}
              </div>
              {/* Responsive feature cards: keep sm/md; enhance lg with balanced heights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:auto-rows-fr">
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Kiến thức chuyên môn</h3>
                    <p className="text-muted-foreground">
                      Là <strong className="customIntroductionBold">học sinh – sinh viên xuất sắc</strong>, có tư duy học tập hiệu quả và tinh thần chia sẻ.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Khuyến khích tự học</h3>
                    <p className="text-muted-foreground">
                      Không “dạy thay” mà <strong className="customIntroductionBold">gợi mở tư duy</strong>, giúp học viên tự học, tự tiến bộ.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Quan tâm học sinh</h3>
                    <p className="text-muted-foreground">
                      <strong className="customIntroductionBold">Theo sát hành trình học</strong>, định hướng lộ trình, cân bằng giữa học và cuộc sống.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Kỹ năng đầy đủ</h3>
                    <p className="text-muted-foreground">
                      Được đào tạo bài bản về <strong className="customIntroductionBold">kỹ năng sư phạm, coaching và mentoring</strong> trước khi đồng hành cùng học viên.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <div className="text-center mb-8 sm:mb-10 md:mb-12 pt-20 md:pt-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Hồ sơ các Mentor tiêu biểu của chúng tôi
            </h1>
            {/* <p className="text-base sm:text-lg text-muted-foreground">
              Nhấn để xem thêm
            </p> */}
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pb-20 md:pb-16">
            {sampleProfiles.map((profile) => (
              <Card key={profile.id} className="shadow-lg hover:shadow-xl transition-shadow aspect-square relative">
                <CardHeader className="cursor-pointer h-full p-6" onClick={() => toggleProfile(profile.id)}>
                  <div className="relative h-full flex flex-col">
                    {/* Top row with large icon left and smaller icons right */}
                    <div className="flex items-start justify-between mb-auto h-[70%]">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                      <div className="p-2 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 w-full aspect-square">
                        <img src={profile.mentor} alt={profile.name} className="rounded-full w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-secondary">
                          <GraduationCap className="h-6 w-6 text-secondary" />
                        </div>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          {expandedProfiles.includes(profile.id) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Bottom area with name and target icon */}
                    <div className="flex items-end justify-between">
                      <CardTitle className="text-2xl text-foreground">
                        {profile.name}
                      </CardTitle>
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent">
                        <Target className="h-5 w-5 text-accent" />
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {expandedProfiles.includes(profile.id) && (
                  <div className="p-3 absolute inset-0 bg-card z-10 rounded-lg animate-fade-in overflow-auto">
                    <CardContent className="space-y-4 p-6 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-foreground">{profile.name}</h3>
                        <Button variant="ghost" size="icon" onClick={() => toggleProfile(profile.id)}>
                          <ChevronUp className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <School className="h-10 w-10 flex-shrink-0" />
                          <span className="text-lg lg: text-xl xl: text-sm font-bold">
                            {profile.expertise}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Workflow className="h-10 w-10 flex-shrink-0" />
                          <span className="text-lg lg: text-xl lg: text-sm font-bold">
                            {profile.experience}
                          </span>
                        </div>
                      </div>
                      <div className="border-t pt-3 space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 text-xl">Châm ngôn:</h4>
                          <div className="items-center justify-center h-full">
                            <p className="text-muted-foreground text-2xl font-bold italic text-center h-full text-orange-500 whitespace-pre-line">{profile.goals}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <section
            className="py-20 w-full bg-gradient-to-br from-secondary/5 to-primary/5"
            style={{
              width: "100vw",
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
            }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                  <span className="text-primary">Học sinh OverSee</span> có gì đặc biệt?
                </h1>
                {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Đừng lo, bạn chỉ là 1 phần nhỏ trong những trường hợp dưới đây
                </p> */}
              </div>
              {/* Responsive feature cards: keep sm/md; enhance lg with balanced heights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:auto-rows-fr">
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ý thức</h3>
                    <p className="text-muted-foreground">
                      Biết <strong className="customIntroductionBold">tự đặt mục tiêu, tự quản lý thời gian</strong>, <strong className="customIntroductionBold">tự tìm cách tiến bộ.</strong>
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Chất lượng</h3>
                    <p className="text-muted-foreground">
                      <strong className="customIntroductionBold">Học đúng</strong> thứ cần, tiết kiệm thời gian và hiệu quả vượt trội.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Đồng hành</h3>
                    <p className="text-muted-foreground">
                      Luôn được <strong className="customIntroductionBold">đồng hành, thấu hiểu</strong> và <strong className="customIntroductionBold">truyền động lực</strong>, để phát triển toàn diện chứ không chỉ trong học tập.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Học đúng</h3>
                    <p className="text-muted-foreground">
                      Không học vì điểm số, mà học vì <strong className="customIntroductionBold">hiểu giá trị</strong> của việc học.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* ===== NEW: Student shares blocks section (masonry + hover animation) ===== */}
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-foreground text-center mb-10">
                Một số chia sẻ của học viên
              </h2>
              {/* Data-driven share cards with expand/collapse + lightbox */}
              {(() => {
                const shares: { id: number; img: string; text: string; tag: string; delay: number }[] = [
                  { id: 1, img: s1, tag: '#OverSeeCare', delay: 0.6, text: `Chị mentor khác hẳn những người lớn trước giờ em từng gặp. Chị không hỏi em điểm bao nhiêu, không bắt em phải học thêm gì. Chị chỉ hỏi “Em có thấy mệt không?”, “Dạo gần đây em đang áp lực phải không?”. Lần đầu tiên có người hỏi em câu đó.` },
                  { id: 2, img: s2, tag: '#IELTSJourney', delay: 0.65, text: `Học IELTS bao nhiêu lâu rồi nhưng lần đầu tiên em chịu ngồi học từ vựng đấy ạ!` },
                  { id: 3, img: s3, tag: '#FeedbackMatters', delay: 0.7, text: `Hồi chưa gặp anh mentor em phải thuê chấm bài bên ngoài, hình như 50k/1 bài ấy. Mà giờ học OverSee mentor chấm cho em mỗi tuần 6 bài, đã thế còn chữa kỹ xong nhắc em viết lại cho hiểu bài mới thôi.` },
                  { id: 4, img: s7, tag: '#OwnYourTime', delay: 0.75, text: `Lịch học ngày trước của em đây. Sau khi học xong khóa Toán cùng mentor, em quyết định bỏ hết các chỗ học thêm để quay lại tự học. Ban đầu em cũng phải nói chuyện với bố mẹ nhiều về điều này lắm, bạn bè xung quanh cũng bảo em không học thêm sao mà giỏi được. Nhưng em tự tin em đã biết cách tự sắp xếp thời gian của mình và cũng tự biết cách tự học các môn khác, cũng giống như cách tự học Toán mà chị mentor đã hướng dẫn em. Giờ em thật sự cảm thấy làm chủ được cuộc sống của mình, biết đánh giá xem học ở đâu, thế nào mới thực sự hiệu quả. Em cảm ơn chị mentor và OverSee nhiều lắm. Hi vọng các bạn đang mất phương hướng, quá tải học thêm giống em ngày xưa cũng sẽ tìm được giải pháp và đam mê thật sự với việc học.` },
                  { id: 5, img: s5, tag: '#PracticeMakesPerfect', delay: 0.8, text: `Em học IELTS ở chỗ khác được 1 năm rồi mà chưa được thi thử lần nào. Vào OverSee hàng tháng, hàng tuần đều được mock test full 4 kỹ năng.` },
                  { id: 6, img: s6, tag: '#TransparentProgress', delay: 0.85, text: `Tháng nào mẹ em cũng nhận được báo cáo này từ OverSee. Thế là mẹ không bao giờ phải hỏi em xem dạo này học hành thế nào nữa :))` },
                  { id: 7, img: s4, tag: '#SpeakDaily', delay: 0.9, text: `Lại đến lịch học cùng mentor của em rồi. Em sẽ tâm sự đủ chuyện trên trời dưới biển nhưng mà… bằng Tiếng Anh.` },
                ];
                return (
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-8 [column-fill:balance]">
                    {shares.map(share => {
                      const expanded = expandedShareIds.includes(share.id);
                      const isLong = share.text.length > 260; // threshold
                      return (
                        <div key={share.id} className="mb-6 break-inside-avoid">
                          <div
                            className="group relative flex items-center gap-6 bg-white rounded-md shadow-md p-6 md:p-5 sm:p-4 sm:flex-col sm:gap-4 transition-all duration-500
                              hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/95
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                              before:absolute before:inset-0 before:rounded-md before:pointer-events-none before:opacity-0 before:transition-opacity before:duration-500 before:bg-gradient-to-r before:from-primary/10 before:to-secondary/10 group-hover:before:opacity-100"
                          >
                            <img
                              src={share.img}
                              className={`w-64 h-64 object-cover rounded-md sm:w-full sm:h-auto animate-[fadeIn_${share.delay}s_ease-out] md:w-52 md:h-52 cursor-zoom-in`}
                              alt={share.tag}
                              onClick={() => { setLightbox({ id: share.id, src: share.img }); setLensPos(null); }}
                            />
                            <div className="flex flex-col gap-3 animate-[slideIn_0.6s_ease-out] w-full">
                              <div className={`relative text-foreground leading-relaxed font-bold ${!expanded && isLong ? 'clamped' : ''}`}> {share.text}
                                {!expanded && isLong && (
                                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="inline-block text-xs font-semibold text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity">{share.tag}</span>
                                {isLong && (
                                  <button
                                    type="button"
                                    onClick={() => toggleShare(share.id)}
                                    className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                  >
                                    {expanded ? 'Thu gọn' : 'Xem thêm'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

            </div>
            {/* Lightbox Overlay */}
            {lightbox && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
                onClick={(e) => { if (e.target === e.currentTarget) { setLightbox(null); setLensPos(null); } }}
              >
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => { setLightbox(null); setLensPos(null); }} aria-label="Đóng">
                    <span className="text-xl leading-none">×</span>
                  </Button>
                </div>
                <div className="flex gap-6 items-start">
                  {/* Base image with lens */}
                  <div
                    className="relative max-w-[60vw] max-h-[85vh] overflow-hidden rounded-lg shadow-2xl bg-black/20 p-3"
                    onMouseMove={(e) => {
                      const imgEl = imgRef.current;
                      if (!imgEl) return;
                      const rect = imgEl.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      if (x < 0 || y < 0 || x > rect.width || y > rect.height) { setLensPos(null); return; }
                      setLensPos({ x, y });
                    }}
                    onMouseLeave={() => setLensPos(null)}
                  >
                    <img
                      ref={imgRef}
                      src={lightbox.src}
                      alt="preview"
                      className="object-contain max-h-[80vh] mx-auto select-none"
                      draggable={false}
                      onLoad={(e) => {
                        const el = e.currentTarget;
                        setImgDims({ w: el.clientWidth, h: el.clientHeight });
                      }}
                    />
                    {lensPos && (
                      <div
                        className="pointer-events-none absolute border-2 border-white shadow-md bg-white/10 backdrop-blur-sm flex items-center justify-center"
                        style={{
                          width: lensSize + 'px',
                          height: lensSize + 'px',
                          left: (lensPos.x - lensSize / 2) + 'px',
                          top: (lensPos.y - lensSize / 2) + 'px'
                        }}
                      >
                        {/* Magnifier icon */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Zoom panel */}
                  <div className="hidden md:block w-[360px] h-[360px] rounded-lg border border-white/30 bg-black/30 overflow-hidden relative shadow-xl">
                    {lensPos ? (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${lightbox.src})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: `${imgDims.w * zoomFactor}px ${imgDims.h * zoomFactor}px`,
                          backgroundPosition: `${-((lensPos.x) * zoomFactor - lensSize / 2)}px ${-((lensPos.y) * zoomFactor - lensSize / 2)}px`
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-white/60 text-sm p-4 text-center">
                        Di chuột lên ảnh để phóng to khu vực.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <style>{`
              /* Masonry helpers */
              .break-inside-avoid { break-inside: avoid; }
              .clamped { display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; overflow:hidden; }
              @supports (animation-timeline: scroll()) {
                /* Future progressive enhancements */
              }
              @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
              @keyframes slideIn { from { opacity:0; transform:translateX(24px);} to { opacity:1; transform:translateX(0);} }
            `}</style>
          </section>



          {/* ===== NEW SECTION: OverSee sẻ chia (redesigned layout) ===== */}
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
                    <p className="text-4xl sm:text-7xl font-bold text-foreground leading-tight mb-2"><strong className="text-4xl sm:text-7xl font-bold text-orange-500 leading-tight">OverSee</strong> sẻ chia</p>
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
                        <video
                          controls
                          className="w-full h-auto"
                          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23003366' width='800' height='450'/%3E%3Ctext fill='%23ffffff' font-family='Arial' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EVideo tổng quan sự kiện%3C/text%3E%3C/svg%3E"
                        >
                          <source src="/OverSee_Video.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
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

        </div>
      </main>
      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Profiles;