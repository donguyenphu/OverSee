import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo_OverSee.png'
import { Route } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 max-w-4xl mx-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 w-16 h-16 rounded-full bg-white px-2 space-x-2 mb-3">
                <img src={ Logo } alt="OverSee logo" className="w-16 h-16" />
                <Link to="/"><span className="text-2xl font-bold">OverSee</span></Link>
              </div>
              <p className="text-background/70 mb-4 text-2xl">
                Với sứ mệnh "Nâng tầm thế hệ trẻ Việt", OverSee sẽ trang bị cho người trẻ kiến thức và kĩ năng trường học không dạy để họ sẵn sàng vươn ra ngoài thế giới.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-2xl">Liên hệ</h4>
              <ul className="space-y-2 text-background/70 text-2xl">
                <li>Email: oversee.education@gmail.com</li>
                <li>Fanpage: <a href="https://www.facebook.com/oversee.org" className='no-underline font-bold text-primary'>OverSee</a></li>
                <li>Địa chỉ: Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-background/10 text-center text-background/70">
            <p><strong>&copy; 2025 OverSee. All rights reserved.</strong></p>
          </div>
        </div>
      </footer>
    );
}

export default Footer;