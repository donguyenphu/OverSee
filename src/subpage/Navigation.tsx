import { BookOpen, Users, Award, GraduationCap, Lightbulb, Video, Clock, Globe } from "lucide-react";
import Logo from "../assets/Logo_OverSee.png";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-3 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <img src={Logo} alt="OverSee logo" className="w-14 h-14" />
                    <span className="text-2xl font-bold text-foreground">OverSee</span>
                </Link>
                <div className="hidden md:flex items-center gap-6 mx-auto">
                    {/* Introduction */}
                    <div className={`transition-colors ${isActive("/")
                                ? "text-white font-semibold bg-blue-500 px-3 p-2 rounded-md"
                                : "text-foreground font-semibold hover:text-primary px-3 py-2 rounded-md"
                                }`}>
                        <Link to="/">
                            Giới thiệu
                        </Link>
                    </div>
                    {/* Community */}
                    <div className={`transition-colors ${isActive("/cong-dong-oversee")
                                ? "text-white font-semibold bg-blue-500 px-3 p-2 rounded-md"
                                : "text-foreground font-semibold hover:text-primary px-3 py-2 rounded-md"
                                }`}>
                        <Link to="/cong-dong-oversee">
                            Cộng đồng OverSee
                        </Link>
                    </div>
                    {/* Register */}
                    <div className={`transition-colors ${isActive("/dang-ky")
                                ? "text-white font-semibold bg-blue-500 px-3 p-2 rounded-md"
                                : "text-foreground font-semibold hover:text-primary px-3 py-2 rounded-md"
                                }`}>
                        <Link to="/dang-ky">
                            Đăng ký
                        </Link>
                    </div>
                    {/* Recruit */}
                    <div className={`transition-colors ${isActive("/tuyen-dung")
                                ? "text-white font-semibold bg-blue-500 px-3 p-2 rounded-md"
                                : "text-foreground font-semibold hover:text-primary px-3 py-2 rounded-md"
                                }`}>
                        <Link to="/tuyen-dung">
                            Tuyển dụng
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;