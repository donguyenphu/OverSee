import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, User, Mail, Phone, GraduationCap, Target } from "lucide-react";
import Navigation from "@/subpage/Navigation";
import Footer from "@/subpage/Footer";

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
    name: "Lê Hoàng Kim Khánh",
    email: "lekhanh301108@gmail.com",
    phone: "0869059473",
    school: "THPT Lê Hồng Phong",
    grade: "Lớp 12 Chuyên Sinh",
    achievements: "Giải Nhất Toán Học cấp thành phố",
    goals: "One step at a time"
  },
  {
    id: 2,
    name: "Nguyễn Hoàng Nam",
    email: "nichbachup2@gmail.com",
    phone: "0904417087",
    school: "THPT Trần Phú",
    grade: "Cựu học sinh lớp chuyên Nga",
    achievements: "Giải Nhì Văn học cấp tỉnh",
    goals: `If you never bleed, 
            you're never gonna grow`
  },
  {
    id: 3,
    name: "Nguyễn Hữu Nam",
    email: "lmchau@email.com",
    phone: "0923456789",
    school: "THPT Nguyễn Huệ",
    grade: "Lớp 12A3",
    achievements: "Học sinh xuất sắc 3 năm liền",
    goals: `Không có việc gì khó
            Chỉ sợ lòng không bền`
  },
  {
    id: 4,
    name: "Nguyễn Nhật Nam",
    email: "pqdung@email.com",
    phone: "0934567890",
    school: "THPT Chu Văn An",
    grade: "Lớp 11A2",
    achievements: "Giải Ba Hóa học quốc gia",
    goals: "You only live once"
  }
];

const Community = () => {
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);

  const toggleProfile = (id: number) => {
    setExpandedProfile(expandedProfile === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      <main className="flex-1">
        {/* Mentor OverSee có gì đặc biệt? */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Mentor OverSee <span className="text-primary">có gì đặc biệt?</span>
              </h1>
              {/* <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Khám phá những người
      </p> */}
            </div>
          </div>
        </section>
        {/* Mentor profiles */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Hồ Sơ Mentor
              </h1>
              <p className="text-lg text-muted-foreground">
                Một số Mentor tiêu biểu của chúng tôi
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {sampleProfiles.map((profile) => (
                <Card key={profile.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="cursor-pointer" onClick={() => toggleProfile(profile.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center border-2 border-secondary">
                            <GraduationCap className="h-6 w-6 text-secondary" />
                          </div>
                          <CardTitle className="text-2xl text-foreground">
                            {profile.name}
                          </CardTitle>
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent">
                            <Target className="h-5 w-5 text-accent" />
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        {expandedProfile === profile.id ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {expandedProfile === profile.id && (
                    <CardContent className="space-y-4 animate-fade-in">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span className="font-medium">Email:</span>
                            <span>{profile.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span className="font-medium">Điện thoại:</span>
                            <span>{profile.phone}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GraduationCap className="h-4 w-4" />
                            <span className="font-medium">Trường:</span>
                            <span>{profile.school}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="font-medium">Lớp:</span>
                            <span>{profile.grade}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Thành tích:</h4>
                          <p className="text-muted-foreground">{profile.achievements}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Mục tiêu:</h4>
                          <p className="text-muted-foreground">{profile.goals}</p>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Mentee OverSee có gì đặc biệt */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Học sinh OverSee <span className="text-primary">có gì đặc biệt?</span>
              </h1>
              {/* <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Khám phá những người
      </p> */}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Community;