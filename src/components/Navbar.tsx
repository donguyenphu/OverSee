import { useState } from "react";
import { GraduationCap, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from '@/assets/Logo_OverSee.png'

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { to: "/", label: "Giới thiệu" },
    { to: "/cong-dong-oversee", label: "Cộng đồng OverSee" },
    { to: "/dang-ky", label: "Đăng ký" },
    { to: "/tuyen-dung", label: "Tuyển dụng" }
  ];
  
  return (

    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50" style={{ width: '100vw', marginLeft: '0.0vw' }}>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`transition-colors flex items-center ${
                    location.pathname.startsWith("/thi-thu")
                      ? "text-white font-semibold bg-blue-500 px-3 py-2 rounded-md"
                      : "text-foreground font-semibold hover:text-primary px-3 py-2 rounded-md"
                  }`}
                >
                  <h3 className = "transition-colors text-foreground font-semibold hover:text-primary px-3 py-2 rounded-md">Thi thử</h3> <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/thi-thu/ielts">IELTS</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="py-2 px-4">
              <div className="font-semibold text-foreground">Thi thử</div>
              <Link
                to="/thi-thu/ielts"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 px-4 rounded-md transition-colors text-foreground hover:bg-accent"
              >
                IELTS
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;