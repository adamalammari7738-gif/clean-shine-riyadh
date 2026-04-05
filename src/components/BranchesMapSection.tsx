import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import branchRiyadh from "@/assets/branch-riyadh.jpg";
import branchJeddah from "@/assets/branch-jeddah.jpg";
import branchDammam from "@/assets/branch-dammam.jpg";
import branchMadinah from "@/assets/branch-madinah.jpg";

gsap.registerPlugin(ScrollTrigger);

const branches = [
  {
    id: 1,
    name: "المقر الرئيسي والمصنع",
    address: "المنطقة الصناعية الثانية، طريق الخرج، الرياض 14334",
    phone: "+966 11 265 7890",
    hours: "السبت - الخميس: 8 ص - 5 م",
    coords: { top: "38%", left: "52%" },
    mapUrl: "https://www.google.com/maps/place/Second+Industrial+City,+Riyadh/@24.5247,46.8462,14z",
    image: branchRiyadh,
  },
  {
    id: 2,
    name: "فرع جدة",
    address: "حي الخمرة، المنطقة الصناعية، جدة 23764",
    phone: "+966 12 261 4523",
    hours: "السبت - الخميس: 9 ص - 6 م",
    coords: { top: "52%", left: "30%" },
    mapUrl: "https://www.google.com/maps/place/Al+Khumra,+Jeddah/@21.3891,39.1672,14z",
    image: branchJeddah,
  },
  {
    id: 3,
    name: "فرع الدمام",
    address: "المنطقة الصناعية الأولى، شارع الملك فهد، الدمام 32234",
    phone: "+966 13 847 2156",
    hours: "السبت - الخميس: 8 ص - 5 م",
    coords: { top: "35%", left: "68%" },
    mapUrl: "https://www.google.com/maps/place/First+Industrial+City,+Dammam/@26.4167,50.0833,14z",
    image: branchDammam,
  },
  {
    id: 4,
    name: "فرع المدينة المنورة",
    address: "حي العزيزية، طريق الملك عبدالله، المدينة المنورة 42311",
    phone: "+966 14 845 3298",
    hours: "السبت - الخميس: 9 ص - 5 م",
    coords: { top: "40%", left: "35%" },
    mapUrl: "https://www.google.com/maps/place/Al+Aziziyah,+Medina/@24.4672,39.5880,14z",
    image: branchMadinah,
  },
];

const BranchesMapSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeBranch, setActiveBranch] = useState(branches[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".map-container", { scale: 0.9, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".branch-card", { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handlePinClick = (branch: typeof branches[0]) => {
    setActiveBranch(branch);
    gsap.fromTo(".branch-info-active", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section id="branches" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-display font-bold text-sm tracking-wider mb-3 block">فروعنا</span>
          <h2 className="section-title mb-4">
            نصل إليك <span className="gradient-text">في كل مكان</span>
          </h2>
          <p className="section-subtitle mx-auto">شبكة فروع واسعة تغطي أهم مدن المملكة العربية السعودية</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <div className="lg:col-span-3 map-container">
            <div className="relative glass-card p-4 md:p-8 overflow-hidden">
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <svg viewBox="0 0 500 375" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100,140 L130,100 L170,85 L210,80 L250,75 L290,80 L340,90 L380,110 L400,130 L410,160 L400,190 L380,210 L360,230 L340,250 L310,270 L280,285 L250,295 L220,300 L190,295 L160,285 L130,270 L110,250 L90,220 L80,190 L85,165 Z"
                    className="fill-accent/40 stroke-primary/30"
                    strokeWidth="2"
                  />
                  {[100, 150, 200, 250, 300, 350].map((y) => (
                    <line key={`h${y}`} x1="50" y1={y} x2="450" y2={y} className="stroke-border/30" strokeWidth="0.5" strokeDasharray="4,4" />
                  ))}
                  {[100, 150, 200, 250, 300, 350, 400].map((x) => (
                    <line key={`v${x}`} x1={x} y1="50" x2={x} y2="350" className="stroke-border/30" strokeWidth="0.5" strokeDasharray="4,4" />
                  ))}
                </svg>

                {branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handlePinClick(branch)}
                    className="absolute group z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: branch.coords.top, left: branch.coords.left }}
                  >
                    <span
                      className={`absolute inset-0 rounded-full animate-ping ${activeBranch.id === branch.id ? "bg-primary/40" : "bg-primary/20"}`}
                      style={{ animationDuration: "2s" }}
                    />
                    <span
                      className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 shadow-lg ${
                        activeBranch.id === branch.id
                          ? "bg-primary border-primary-foreground scale-110"
                          : "bg-card border-primary/50 hover:bg-primary hover:border-primary-foreground hover:scale-110"
                      }`}
                    >
                      <MapPin className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                        activeBranch.id === branch.id ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"
                      }`} />
                    </span>
                    <span
                      className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-display font-bold px-2 py-0.5 rounded transition-all duration-300 ${
                        activeBranch.id === branch.id ? "text-primary bg-accent" : "text-muted-foreground"
                      }`}
                    >
                      {branch.name.split(" ").pop()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Branch Details */}
          <div className="lg:col-span-2 space-y-4">
            {branches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => handlePinClick(branch)}
                className={`branch-card w-full text-right rounded-2xl border-2 transition-all duration-400 overflow-hidden ${
                  activeBranch.id === branch.id
                    ? "border-primary bg-accent/50 shadow-md branch-info-active"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-0">
                  {/* Branch Image */}
                  <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 overflow-hidden">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      loading="lazy"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h4 className="font-display font-bold text-foreground mb-1 text-sm md:text-base">{branch.name}</h4>
                    <p className="text-muted-foreground font-body text-xs md:text-sm mb-1">{branch.address}</p>
                    {activeBranch.id === branch.id && (
                      <div className="space-y-1.5 mt-2 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground font-body">
                          <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                          <a href={`tel:${branch.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-primary transition-colors">
                            {branch.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground font-body">
                          <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{branch.hours}</span>
                        </div>
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-display font-bold text-primary hover:underline mt-1"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          فتح في خرائط Google
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesMapSection;
