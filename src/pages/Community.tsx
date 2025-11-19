import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, User, Mail, Phone, GraduationCap, Target, School, Workflow } from "lucide-react";
import Navbar from "@/components/NavBar"
import Mentor1 from '@/assets/1.jpg';
import Mentor2 from '@/assets/2.jpg';
import Mentor3 from '@/assets/3.jpg';
import Mentor4 from '@/assets/4.jpg';
import Footer from "@/subpage/Footer";

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
      <ul className="leading-normal list-circle pl-5">
        <li>Học sinh lớp chuyên Sinh niên khoá 2023-2026, trường THPT Chuyên Trần Phú</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
      </ul>
    ),
    experience: (
      <ul className="leading-normal list-circle pl-5">
        <li>Thủ khoa kỳ thi học sinh giỏi Quận Ngô Quyền (lớp 9)</li>
        <li>Giải Nhì hsg môn Sinh cấp thành phố (lớp 9)</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
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
        <li>Học sinh lớp chuyên Sinh niên khoá 2023-2026, trường THPT Chuyên Trần Phú</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
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
        <li>Học sinh lớp chuyên Sinh niên khoá 2023-2026, trường THPT Chuyên Trần Phú</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
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
        <li>Học sinh lớp chuyên Sinh niên khoá 2023-2026, trường THPT Chuyên Trần Phú</li>
        <li>Mentor hướng dẫn môn Sinh chuyên</li>
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
        <div className="container mx-auto px-4">
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
                  <div className="absolute inset-0 bg-card z-10 rounded-lg animate-fade-in overflow-auto">
                    <CardContent className="space-y-4 p-6 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-foreground">{profile.name}</h3>
                        <Button variant="ghost" size="icon" onClick={() => toggleProfile(profile.id)}>
                          <ChevronUp className="h-6 w-6" />
                        </Button>
                      </div>

                      <div className="space-y-3">
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
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profiles;