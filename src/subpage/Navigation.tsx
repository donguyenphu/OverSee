import { BookOpen, Users, Award, GraduationCap, Lightbulb, Video, Clock, Globe } from "lucide-react";
import Logo from "../assets/Logo_OverSee.png";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="OverSee logo" className="w-14 h-14" />
            <span className="text-2xl font-bold text-foreground">OverSee</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 mx-auto">
            <Link 
            to="/" 
            className={`transition-colors ${
                isActive("/")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
            >
                Giới thiệu
            </Link>
            <Link 
            to="/cong-dong-oversee" 
            className={`transition-colors ${
                isActive("/cong-dong-oversee")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
            >
                Cộng đồng OverSee
            </Link>
            <Link 
            to="/dang-ky" 
            className={`transition-colors ${
                isActive("/dang-ky")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
            >
                Đăng ký
            </Link>
            <Link 
            to="/tuyen-dung" 
            className={`transition-colors ${
                isActive("/tuyen-dung")
                ? "text-primary font-semibold"
                : "text-foreground hover:text-primary"
            }`}
            >
                Tuyển dụng
            </Link>
          </div>
        </div>
      </nav>
    );
};

export default Navigation;