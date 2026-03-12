import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Droplets, Phone } from "lucide-react";

const navLinks = [
  { label: "الرئيسية", href: "#hero" },
  { label: "من نحن", href: "#about" },
  { label: "منتجاتنا", href: "#products" },
  { label: "لماذا نقاء", href: "#why-us" },
  { label: "فروعنا", href: "#branches" },
  { label: "تواصل معنا", href: "#contact" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    }
    if (linksRef.current) {
      gsap.fromTo(
        linksRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll("button"),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.3, delay: 0.15, ease: "power2.out" }
      );
    }
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-2xl shadow-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      {/* Top bar - visible when not scrolled */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="bg-primary/90 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-6 py-2">
            <div className="flex items-center gap-4 text-primary-foreground/90 text-xs font-body">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +966 11 XXX XXXX
              </span>
              <span className="hidden sm:block">|</span>
              <span className="hidden sm:block">الرياض، المملكة العربية السعودية</span>
            </div>
            <span className="text-primary-foreground/70 text-xs font-body">السبت - الخميس: 8 ص - 5 م</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className={`transition-all duration-500 ${scrolled ? "py-3" : "py-4"}`}>
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }} className="flex items-center gap-3 group">
            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
              scrolled ? "bg-primary shadow-md" : "bg-primary-foreground/20 backdrop-blur-sm"
            }`}>
              <Droplets className={`w-5 h-5 transition-colors duration-500 ${
                scrolled ? "text-primary-foreground" : "text-primary-foreground"
              }`} />
              <div className="absolute inset-0 rounded-xl bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <div>
              <span className={`text-2xl font-display font-black block leading-none transition-colors duration-500 ${
                scrolled ? "gradient-text" : "text-primary-foreground"
              }`}>
                نقاء
              </span>
              <span className={`text-[10px] font-body tracking-wider transition-colors duration-500 ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/60"
              }`}>
                للمنظفات الاحترافية
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div ref={linksRef} className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 rounded-lg font-body font-medium text-sm transition-all duration-300 ${
                  activeSection === link.href
                    ? scrolled
                      ? "text-primary bg-accent"
                      : "text-primary-foreground bg-primary-foreground/15"
                    : scrolled
                      ? "text-foreground/80 hover:text-primary hover:bg-accent/50"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full ${
                    scrolled ? "bg-primary" : "bg-primary-foreground"
                  }`} />
                )}
              </button>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#contact")}
              className={`hidden md:block px-5 py-2 rounded-full font-display font-bold text-sm transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "text-primary-foreground shadow-md hover:shadow-lg"
                  : "bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/30"
              }`}
              style={scrolled ? { background: "var(--gradient-primary)" } : {}}
            >
              طلب عرض سعر
            </button>

            <button
              className={`lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                scrolled ? "text-foreground hover:bg-accent" : "text-primary-foreground hover:bg-primary-foreground/10"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className={`absolute transition-all duration-300 ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>
                <Menu size={22} />
              </span>
              <span className={`absolute transition-all duration-300 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
                <X size={22} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div ref={mobileMenuRef} className="lg:hidden bg-card/98 backdrop-blur-2xl border-t border-border/50 overflow-hidden">
          <div className="flex flex-col items-stretch px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-right px-4 py-3 rounded-xl font-body font-medium text-base transition-all duration-300 ${
                  activeSection === link.href
                    ? "text-primary bg-accent"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="mt-3 py-3 rounded-xl font-display font-bold text-primary-foreground text-center"
              style={{ background: "var(--gradient-primary)" }}
            >
              طلب عرض سعر
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
