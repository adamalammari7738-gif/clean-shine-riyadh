import { Droplets } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/80 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-8 h-8 text-accent" />
              <span className="text-2xl font-display font-black text-primary-foreground">نقاء</span>
            </div>
            <p className="font-body leading-relaxed text-primary-foreground/60">
              مصنع نقاء للمنظفات — ريادة في صناعة حلول التنظيف الاحترافية من قلب الرياض
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              {["الرئيسية", "من نحن", "منتجاتنا", "لماذا نقاء", "تواصل معنا"].map((link) => (
                <a key={link} href="#" className="font-body text-primary-foreground/60 hover:text-accent transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">الموقع</h4>
            <p className="font-body text-primary-foreground/60 leading-relaxed">
              الرياض، المملكة العربية السعودية
              <br />
              المنطقة الصناعية
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="font-body text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} مصنع نقاء للمنظفات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
