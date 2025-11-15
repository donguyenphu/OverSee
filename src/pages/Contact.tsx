import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";  
import Navigation from "@/subpage/Navigation";
import Footer from "@/subpage/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation/>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Liên hệ <span className="text-primary">với chúng tôi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Gửi tin nhắn</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input id="name" placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" type="tel" placeholder="0123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Tin nhắn</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Nội dung tin nhắn của bạn..." 
                        rows={5}
                      />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Gửi tin nhắn
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Thông tin liên hệ
                </h2>
                <p className="text-muted-foreground mb-8">
                  Hãy liên hệ với chúng tôi qua các kênh sau hoặc điền form bên cạnh
                </p>
              </div>

              <div className="space-y-4">
                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">xxx@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Điện thoại</h3>
                        <p className="text-muted-foreground">Hotline: 1900-xxxx</p>
                        <p className="text-muted-foreground">Hỗ trợ: 024-xxxx-xxxx</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Địa chỉ</h3>
                        <p className="text-muted-foreground">
                          123 Đường ABC, Quận XYZ
                        </p>
                        <p className="text-muted-foreground">Hà Nội, Việt Nam</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Giờ làm việc</h3>
                <p className="text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                <p className="text-muted-foreground">Thứ 7: 8:00 - 12:00</p>
                <p className="text-muted-foreground">Chủ nhật: Nghỉ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Contact;
