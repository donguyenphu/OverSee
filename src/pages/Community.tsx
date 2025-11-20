import { useState } from "react";
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
    name: "Lê Hoàng Kim Khánh",
    expertise: (
      <ul className="leading-normal list-circle pl-5 text: black">
        <li>Học sinh lớp chuyên Sinh niên khoá 2023-2026, trường THPT Chuyên Trần Phú</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
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
    name: "Nguyễn Hoàng Nam",
    expertise: (
      <ul className="leading-normal list-circle pl-5">
        <li>Cựu học sinh lớp  chuyên Nga.</li>
        <li>Mentor hướng dẫn chứng chỉ IELTS chuyên về kỹ năng Speaking</li>
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
    name: "Nguyễn Hữu Nam",
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
    name: "Nguyễn Nhật Nam",
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
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);

  const toggleProfile = (id: number) => {
    setExpandedProfile(expandedProfile === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto">
          <section className="pt-0 pb-20 w-full">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                  <span className="text-primary">Mentor OverSee</span> có gì đặc biệt?
                </h1>
                {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Đừng lo, bạn chỉ là 1 phần nhỏ trong những trường hợp dưới đây
                </p> */}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-border hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Chuyên môn cao</h3>
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
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Hồ sơ các Mentor tiêu biểu của chúng tôi
            </h1>
            {/* <p className="text-base sm:text-lg text-muted-foreground">
              Nhấn để xem thêm
            </p> */}
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
                          {expandedProfile === profile.id ? (
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

                {expandedProfile === profile.id && (
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

          <section className="pt-20 w-full">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
                  <span className="text-primary">Học sinh OverSee</span> có gì đặc biệt?
                </h1>
                {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Đừng lo, bạn chỉ là 1 phần nhỏ trong những trường hợp dưới đây
                </p> */}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <h3 className="text-xl font-semibold text-foreground mb-2">Đồng hành mọi lúc</h3>
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
                    <h3 className="text-xl font-semibold text-foreground mb-2">Kỹ năng đầy đủ</h3>
                    <p className="text-muted-foreground">
                      Được đào tạo bài bản về <strong className="customIntroductionBold">kỹ năng sư phạm, coaching và mentoring</strong> trước khi đồng hành cùng học viên.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profiles;