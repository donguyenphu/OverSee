import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'trang chủ' },
    { path: '/co-van', label: 'cố vấn' },
    { path: '/hoc-vien', label: 'học viên' },
    { path: '/lien-he', label: 'liên hệ' },
  ];

  return (
    <header className="bg-[hsl(var(--header-bg))] text-[hsl(var(--header-foreground))] py-4 header-shadow fixed top-0 w-full z-40">
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