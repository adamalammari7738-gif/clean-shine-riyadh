import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Leaf, Beaker, Truck, HeartHandshake, Microscope } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Shield, title: "جودة معتمدة", desc: "منتجات حاصلة على شهادات الجودة العالمية ISO" },
  { icon: Leaf, title: "صديقة للبيئة", desc: "تركيبات آمنة وقابلة للتحلل البيولوجي" },
  { icon: Beaker, title: "مختبرات متطورة", desc: "أحدث المختبرات لضمان فعالية كل منتج" },
  { icon: Truck, title: "توصيل سريع", desc: "شبكة توزيع تغطي جميع مناطق المملكة" },
  { icon: HeartHandshake, title: "دعم فني متميز", desc: "فريق متخصص لخدمة العملاء على مدار الساعة" },
  { icon: Microscope, title: "بحث وتطوير", desc: "استثمار مستمر في تطوير تركيبات جديدة" },
];

const WhyUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0, rotateX: 15 },
        {
          y: 0, opacity: 1, rotateX: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="section-padding" style={{ background: "var(--gradient-light)" }}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-display font-bold text-sm tracking-wider mb-3 block">لماذا نقاء</span>
          <h2 className="section-title mb-4">
            معايير <span className="gradient-text">لا نتنازل عنها</span>
          </h2>
          <p className="section-subtitle mx-auto">
            نلتزم بأعلى معايير الجودة والسلامة في كل مرحلة من مراحل التصنيع
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="feature-card glass-card p-8 group hover:bg-primary hover:shadow-xl transition-all duration-500 cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary-foreground/20 transition-colors duration-500">
                <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary-foreground transition-colors duration-500">
                {title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed group-hover:text-primary-foreground/80 transition-colors duration-500">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
