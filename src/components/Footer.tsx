import { Link } from "react-router-dom";
import { Smartphone, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import Logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Thai Pattern Divider */}
      <div className="h-2 bg-gradient-gold" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={Logo} alt="logo" />                
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">Phone</span>
                <span className="text-secondary-foreground">Spec</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/70 text-sm">
              เว็บไซต์แนะนำมือถือที่ดีที่สุด
              พร้อมรีวิวและเปรียบเทียบสเปกอย่างละเอียด
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">เมนูหลัก</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "หน้าแรก", href: "/" },
                { label: "โทรศัพท์ทั้งหมด", href: "/phones" },
                { label: "เปรียบเทียบ", href: "/compare" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">หมวดหมู่</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "มือถือระดับเรือธง", href: "/phones?category=flagship" },
                { label: "มือถือระดับกลาง", href: "/phones?category=midrange" },
                { label: "มือถือราคาประหยัด", href: "/phones?category=budget" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">ติดต่อเรา</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-secondary-foreground/70">
                <Mail className="h-4 w-4" />
                phonespec@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/50">
          <p>© 2024 PhoneSpec. สงวนลิขสิทธิ์ทั้งหมด</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
