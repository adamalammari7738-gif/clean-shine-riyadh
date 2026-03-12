import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import factoryImg from "@/assets/factory.jpg";
import { Award, Factory, Users, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Factory, value: "+15", label: "سنة خبرة" },
  { icon: Users, value: "+500", label: "عميل راضي" },
  { icon: Award, value: "+30", label: "منتج احترافي" },
  { icon: Sparkles, value: "100%", label: "جودة سعودية" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, delay: i * 0.15,
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding" style={{ background: "var(--gradient-light)" }}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Image with parallax */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={factoryImg} alt="مصنع نقاء" className="w-full h-[400px] lg:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
              <span className="text-primary-foreground font-display font-black text-2xl">+15</span>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="text-primary font-display font-bold text-sm tracking-wider mb-3 block">من نحن</span>
            <h2 className="section-title mb-6">
              ريادة في صناعة
              <br />
              <span className="gradient-text">المنظفات الاحترافية</span>
            </h2>
            <p className="section-subtitle mb-8">
              منذ أكثر من ١٥ عامًا، يقدم مصنع نقاء من الرياض أفضل حلول التنظيف المصنّعة بأعلى معايير الجودة العالمية. نفخر بتقديم منتجات آمنة وفعّالة تلبي احتياجات المنازل والمنشآت التجارية في جميع أنحاء المملكة.
            </p>
            <div className="flex flex-wrap gap-3">
              {["ISO معتمد", "صناعة سعودية", "صديق للبيئة", "تركيبات متطورة"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-accent text-accent-foreground font-body text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="stat-card glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
              <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-display font-black text-foreground mb-1">{value}</p>
              <p className="text-muted-foreground font-body text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
