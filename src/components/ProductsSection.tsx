import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: "منظف الأسطح المتعدد", desc: "تركيبة قوية لجميع الأسطح مع حماية مضادة للبكتيريا", image: product1, tag: "الأكثر مبيعاً" },
  { name: "منظف الأرضيات الصناعي", desc: "مصمم للمنشآت التجارية والصناعية بقوة تنظيف فائقة", image: product2, tag: "للشركات" },
  { name: "منظف الغسيل المركّز", desc: "تركيبة مركّزة تزيل أصعب البقع مع حماية الألوان", image: product3, tag: "جديد" },
  { name: "صابون الأطباق الاحترافي", desc: "رغوة كثيفة وفعالية عالية في إزالة الدهون", image: product4, tag: "عائلي" },
];

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="products" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-display font-bold text-sm tracking-wider mb-3 block">منتجاتنا</span>
          <h2 className="section-title mb-4">
            حلول تنظيف <span className="gradient-text">لكل احتياج</span>
          </h2>
          <p className="section-subtitle mx-auto">
            مجموعة شاملة من المنظفات الاحترافية المصنّعة بأحدث التقنيات لضمان أعلى مستويات النظافة
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="product-card group glass-card overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative bg-secondary/50 p-6 flex items-center justify-center h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-52 object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-display font-bold px-3 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
