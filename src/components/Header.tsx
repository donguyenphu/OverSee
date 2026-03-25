import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [offsetY, setOffsetY] = useState(0);

  const headerHeight = 80; // để giới hạn transform

  const navItems = [
    { path: '/', label: 'trang chủ' },
    { path: '/co-van', label: 'cố vấn' },
    { path: '/hoc-vien', label: 'học viên' },
    { path: '/lien-he', label: 'liên hệ' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setOffsetY(Math.min(currentScrollY, headerHeight));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-[hsl(var(--header-bg))] text-[hsl(var(--header-foreground))] py-4 header-shadow fixed top-0 w-full z-40 transition-transform duration-75" style={{ transform: `translateY(${-offsetY}px)` }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold">logo</div>
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:opacity-80 ${
                    location.pathname === item.path ? 'nav-link-active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Mobile navigation */}
          <nav className="md:hidden flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-medium transition-colors hover:opacity-80 ${
                  location.pathname === item.path ? 'nav-link-active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;