import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneCall, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div
          className="cta-content relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary-foreground/5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-primary-foreground/5 translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
              <PhoneCall className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-primary-foreground mb-4">
              جاهزون لخدمتكم
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 font-body max-w-2xl mx-auto mb-8">
              احصل على عرض سعر مخصص لاحتياجاتك — فريقنا جاهز للإجابة على استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full bg-primary-foreground text-primary font-display font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                تواصل معنا الآن
                <ArrowLeft className="w-5 h-5" />
              </button>
              <a
                href="tel:+966110000000"
                className="px-8 py-4 rounded-full border-2 border-primary-foreground/40 text-primary-foreground font-display font-bold text-lg hover:bg-primary-foreground/10 transition-all duration-300"
              >
                اتصل مباشرة
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
