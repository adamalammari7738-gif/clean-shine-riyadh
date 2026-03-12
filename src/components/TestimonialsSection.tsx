import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, ChevronRight, ChevronLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "م. عبدالله الشمري",
    role: "مدير مشتريات - فندق خمس نجوم",
    text: "منتجات نقاء غيّرت معايير النظافة في فندقنا بالكامل. الجودة استثنائية والدعم الفني ممتاز.",
    rating: 5,
  },
  {
    name: "أ. سارة العتيبي",
    role: "مديرة تشغيل - مجمع تجاري",
    text: "نتعامل مع مصنع نقاء منذ ٥ سنوات ولم نواجه أي مشكلة. أسعار منافسة وجودة لا تتغير.",
    rating: 5,
  },
  {
    name: "م. خالد القحطاني",
    role: "مسؤول صيانة - مستشفى خاص",
    text: "المنتجات حاصلة على جميع الشهادات المطلوبة وآمنة تماماً للاستخدام في البيئات الطبية.",
    rating: 5,
  },
  {
    name: "أ. فهد الدوسري",
    role: "صاحب شركة تنظيف",
    text: "أفضل مورد منظفات تعاملت معه. التوصيل سريع والمنتجات فعّالة جداً مع العملاء.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-container",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    gsap.fromTo(".testimonial-slide", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
  }, [current]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-display font-bold text-sm tracking-wider mb-3 block">آراء عملائنا</span>
          <h2 className="section-title mb-4">
            ماذا يقول <span className="gradient-text">عملاؤنا</span>
          </h2>
        </div>

        <div className="testimonial-container max-w-3xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
            
            <div className="testimonial-slide">
              {/* Stars */}
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground font-body leading-relaxed text-center mb-8">
                "{t.text}"
              </p>

              <div className="text-center">
                <p className="font-display font-bold text-foreground text-lg">{t.name}</p>
                <p className="text-muted-foreground font-body text-sm">{t.role}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-border hover:bg-accent transition-colors flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-7" : "bg-border hover:bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-border hover:bg-accent transition-colors flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
