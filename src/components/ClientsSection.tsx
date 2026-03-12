import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Hotel, Hospital, School, ShoppingBag, Plane } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { icon: Hotel, name: "الفنادق والضيافة" },
  { icon: Hospital, name: "المستشفيات" },
  { icon: Building2, name: "الشركات الكبرى" },
  { icon: School, name: "المؤسسات التعليمية" },
  { icon: ShoppingBag, name: "المراكز التجارية" },
  { icon: Plane, name: "شركات الطيران" },
];

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite scroll animation for the track
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth / 2;
        gsap.to(trackRef.current, {
          x: -totalWidth,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.fromTo(
        ".clients-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden" style={{ background: "var(--gradient-light)" }}>
      <div className="container mx-auto px-6 mb-10">
        <div className="clients-heading text-center">
          <span className="text-primary font-display font-bold text-sm tracking-wider mb-3 block">عملاؤنا</span>
          <h2 className="section-title mb-4">
            موثوق من <span className="gradient-text">كبرى المنشآت</span>
          </h2>
        </div>
      </div>

      {/* Scrolling track */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none" />
        
        <div ref={trackRef} className="flex gap-8 w-max">
          {[...clients, ...clients, ...clients, ...clients].map(({ icon: Icon, name }, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 shrink-0"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
