import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import { Droplets, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(imageRef.current, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8 })
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=1")
      .fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

    // Parallax on scroll
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        gsap.to(imageRef.current, { y: scrollY * 0.3, duration: 0.3, ease: "none" });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img src={heroBg} alt="منتجات نقاء للتنظيف" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Droplets
            key={i}
            className="absolute text-primary-foreground/10 animate-float"
            size={20 + i * 8}
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-primary-foreground leading-tight mb-6"
        >
          مصنع نقاء
          <br />
          <span className="text-accent text-3xl md:text-5xl lg:text-6xl font-bold">للمنظفات الاحترافية</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-primary-foreground/85 font-body max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          نصنع النظافة بأعلى معايير الجودة من قلب الرياض — حلول تنظيف متطورة للمنازل والمنشآت التجارية
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToProducts}
            className="px-10 py-4 rounded-full font-display font-bold text-lg bg-primary-foreground text-primary hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            اكتشف منتجاتنا
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 rounded-full font-display font-bold text-lg border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
          >
            تواصل معنا
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-primary-foreground/60" size={28} />
      </div>
    </section>
  );
};

export default HeroSection;
