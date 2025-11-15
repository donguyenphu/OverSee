import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo_OverSee.png'

const Footer = () => {
    return (
        <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={ Logo } alt="OverSee logo" className="w-14 h-14" />
                <span className="text-xl font-bold">OverSee</span>
              </div>
              <p className="text-background/70 mb-4">
                Chương trình đồng hành học tập hiệu quả nhất cho học sinh Việt Nam
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-background/70">
                <li>Email: oversee.education@gmail.com</li>
                <li>Hotline: 1900-xxxx</li>
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