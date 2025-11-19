import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, User, Mail, Phone, GraduationCap, Target } from "lucide-react";
import Navbar from "@/components/NavBar"

interface Profile {
  id: number;
  name: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  achievements: string;
  goals: string;
}

const sampleProfiles: Profile[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "vanan@email.com",
    phone: "0901234567",
    school: "THPT Lê Hồng Phong",
    grade: "Lớp 11A1",
    achievements: "Giải Nhất Toán Học cấp thành phố",
    goals: "Đậu đại học Y khoa"
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "tranbinh@email.com",
    phone: "0912345678",
    school: "THPT Trần Phú",
    grade: "Lớp 10B2",
    achievements: "Giải Nhì Văn học cấp tỉnh",
    goals: "Phát triển kỹ năng viết"
  },
  {
    id: 3,
    name: "Lê Minh Châu",
    email: "lmchau@email.com",
    phone: "0923456789",
    school: "THPT Nguyễn Huệ",
    grade: "Lớp 12A3",
    achievements: "Học sinh xuất sắc 3 năm liền",
    goals: "Thi vào trường Bách Khoa"
  },
  {
    id: 4,
    name: "Phạm Quốc Dũng",
    email: "pqdung@email.com",
    phone: "0934567890",
    school: "THPT Chu Văn An",
    grade: "Lớp 11A2",
    achievements: "Giải Ba Hóa học quốc gia",
    goals: "Phát triển tư duy khoa học"
  },
  {
    id: 5,
    name: "Võ Thị Hương",
    email: "vthuong@email.com",
    phone: "0945678901",
    school: "THPT Trần Đại Nghĩa",
    grade: "Lớp 10A1",
    achievements: "Thành viên CLB Khoa học trẻ",
    goals: "Cải thiện điểm Toán và Lý"
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
              Hồ Sơ Học Viên
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Những học viên tiêu biểu của chúng tôi
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sampleProfiles.map((profile) => (
              <Card key={profile.id} className="shadow-lg hover:shadow-xl transition-shadow aspect-square relative">
                <CardHeader className="cursor-pointer h-full p-6" onClick={() => toggleProfile(profile.id)}>
                  <div className="relative h-full flex flex-col">
                    {/* Top row with large icon left and smaller icons right */}
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                        <User className="h-10 w-10 text-primary" />
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
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">{profile.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <GraduationCap className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">{profile.school}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-sm font-medium">Lớp:</span>
                          <span className="text-sm">{profile.grade}</span>
                        </div>
                      </div>

                      <div className="border-t pt-3 space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 text-sm">Thành tích:</h4>
                          <p className="text-muted-foreground text-sm">{profile.achievements}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 text-sm">Mục tiêu:</h4>
                          <p className="text-muted-foreground text-sm">{profile.goals}</p>
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
    </div>
  );
};

export default Profiles;