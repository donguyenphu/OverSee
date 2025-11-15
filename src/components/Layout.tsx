import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen main-gradient">
      <Header />
      <main className="pt-20 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;