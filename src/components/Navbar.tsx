import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from '@/assets/Logo_OverSee.png'

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { to: "/", label: "Giới thiệu" },
    { to: "/cong-dong-oversee", label: "Cộng đồng OverSee" },
    { to: "/dang-ky", label: "Đăng ký" },
    { to: "/tuyen-dung", label: "Tuyển dụng" },
  ];
  
  return (

    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50" style={{ width: '105vw', marginLeft: '-2.5vw' }}>
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="OverSee logo" className="w-14 h-14" />
            <span className="text-xl md:text-2xl font-bold text-foreground">OverSee</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${
                  isActive(link.to)
                    ? "text-white font-semibold bg-blue-500 px-3 p-2 rounded-md"
                    : "text-foreground font-semibold hover:text-primary px-3 py-2 rounded-md"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-4 rounded-md transition-colors ${
                  isActive(link.to)
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;