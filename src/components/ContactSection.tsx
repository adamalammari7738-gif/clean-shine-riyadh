import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: MapPin, label: "العنوان", value: "الرياض، المملكة العربية السعودية" },
  { icon: Phone, label: "الهاتف", value: "+966 11 XXX XXXX" },
  { icon: Mail, label: "البريد الإلكتروني", value: "info@naqaa-factory.sa" },
  { icon: Clock, label: "ساعات العمل", value: "السبت - الخميس: 8 ص - 5 م" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-display font-bold text-sm tracking-wider mb-3 block">تواصل معنا</span>
          <h2 className="section-title mb-4">
            نسعد <span className="gradient-text">بخدمتكم</span>
          </h2>
          <p className="section-subtitle mx-auto">
            تواصل مع فريقنا المتخصص لأي استفسارات أو طلبات
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-content space-y-6">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-5 glass-card p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground mb-1">{label}</p>
                  <p className="text-muted-foreground font-body">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="contact-content glass-card p-8">
            <h3 className="font-display font-bold text-2xl text-foreground mb-6">أرسل لنا رسالة</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="w-full px-5 py-3 rounded-xl bg-secondary border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <input
                  type="tel"
                  placeholder="رقم الجوال"
                  className="w-full px-5 py-3 rounded-xl bg-secondary border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full px-5 py-3 rounded-xl bg-secondary border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <textarea
                placeholder="رسالتك..."
                rows={4}
                className="w-full px-5 py-3 rounded-xl bg-secondary border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-display font-bold text-lg text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{ background: "var(--gradient-primary)" }}
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
