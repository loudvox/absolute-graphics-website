import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Phone, ArrowRight, Printer, Feather, Layers, Monitor, ChevronRight,
  MapPin, Mail, Instagram, Facebook, Heart
} from 'lucide-react';

import { CustomCursor } from './components/CustomCursor';
import { MagneticButton } from './components/MagneticButton';
import { Marquee } from './components/Marquee';
import GoogleReviews from './components/GoogleReviews';
import { CanvasSequence } from './components/CanvasSequence';
gsap.registerPlugin(ScrollTrigger);

const GALLERY_1 = ['/gallery/1.jpg', '/gallery/2.jpg', '/gallery/3.jpg', '/gallery/4.jpg', '/gallery/5.jpg', '/gallery/6.jpg'];
const GALLERY_2 = ['/gallery/7.jpg', '/gallery/8.jpg', '/gallery/9.jpg', '/gallery/10.jpg', '/gallery/11.jpg', '/gallery/12.jpg'];

const getFramePath = (i: number) => `/hero-sequence/frame_${String(i).padStart(4, '0')}.jpg`;

function App() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline();
      heroTl.from('.reveal-line', { yPercent: 100, duration: 1, stagger: 0.2, ease: "expo.out" });
      heroTl.to('#hero-underline', { width: "100%", duration: 0.8, ease: "power2.inOut" }, "-=0.3");
      heroTl.to('#hero-bg', { scale: 1, duration: 2.5, ease: "power2.out" }, 0);
      heroTl.to(['#hero-desc', '#hero-ctas', '#hero-front-img-container'], { opacity: 1, y: -20, duration: 1, stagger: 0.1 }, "-=0.5");

      // Counters
      gsap.utils.toArray('.count').forEach((counter: any) => {
        gsap.from(counter, {
          innerText: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: counter, start: "top 90%" },
          snap: { innerText: 1 }
        });
      });

      // Service Cards
      gsap.from(gsap.utils.toArray('.service-card'), {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: '.service-cards-container', start: "top 85%" }
      });

      // Wipe Cards
      document.querySelectorAll('.wipe-card').forEach(card => {
        gsap.set(card, { perspective: 1000 });
        const onMouseMove = (e: any) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, { rotationY: x * 10, rotationX: -y * 10, duration: 0.5, ease: "power2.out" });
        };
        const onMouseLeave = () => gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5 });

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);
      });

      // Steve Reveal
      gsap.from('#steve-portrait', { x: -100, opacity: 0, duration: 1.5, scrollTrigger: { trigger: '#steve-portrait', start: "top 70%" } });
      gsap.from('#steve-content', { x: 50, opacity: 0, duration: 1.2, scrollTrigger: { trigger: '#steve-content', start: "top 70%" } });
    });

    // Timer
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev <= 1 ? 60 : prev - 1);
    }, 1000);

    return () => {
      lenis.destroy();
      ctx.revert();
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <CustomCursor />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-primary/5">
        <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <MagneticButton as="a" href="#" strength={15} className="flex items-center group">
              <img src="/public/logo.png" alt="Absolute Graphics Co" className="h-16 w-auto transition-transform group-hover:scale-105" />
            </MagneticButton>
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="nav-link text-sm font-medium">Products</a>
              <a href="#" className="nav-link text-sm font-medium">Who It's For</a>
              <a href="#work" className="nav-link text-sm font-medium">Portfolio</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[10px] uppercase font-bold text-muted">Free local pickup</span>
              <a href="tel:9046933191" className="text-sm font-bold flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> (904) 693-3191
              </a>
            </div>
            <MagneticButton as="a" href="#quote" strength={20} className="bg-primary text-surface px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide hover:bg-accent hover:-translate-y-0.5 transition-all">
              Get a Quote
            </MagneticButton>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden bg-primary">
          <div id="hero-bg" className="absolute inset-0 z-0 scale-110">
            <img src="https://images.unsplash.com/photo-1541870230289-84275bed0aa7?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10 pt-20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="max-w-4xl lg:w-1/2">
                <div id="hero-badge" className="inline-block bg-accent px-3 py-1 mb-8">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-surface font-display">Est. 1999 • Jacksonville, FL</span>
                </div>
                <h1 id="hero-title" className="text-6xl md:text-8xl lg:text-9xl text-surface mb-8 leading-[0.9] font-display font-black uppercase tracking-tighter overflow-hidden">
                  <div className="reveal-line">Bands & brands</div>
                  <div className="reveal-line relative inline-block">
                    <span className="text-accent italic">print here.</span>
                    <div id="hero-underline" className="absolute bottom-4 left-0 w-0 h-3 bg-accent-light/30 -z-10"></div>
                  </div>
                </h1>
                <p id="hero-desc" className="text-lg md:text-xl text-surface/80 mb-12 max-w-xl leading-relaxed opacity-0">
                  Custom apparel, embroidery, stickers, and signs — printed with precision in Jacksonville for over 20 years. Free local pickup and national shipping.
                </p>
                <div id="hero-ctas" className="flex flex-col sm:flex-row gap-6 opacity-0">
                  <MagneticButton as="a" href="#quote" strength={30} className="bg-accent text-surface px-10 py-6 rounded-sm font-bold uppercase tracking-widest hover:bg-accent-light transition-all flex items-center justify-center gap-3 group">
                    Get an instant quote <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </MagneticButton>
                  <a href="#work" className="border border-surface/30 text-surface px-10 py-6 rounded-sm font-bold uppercase tracking-widest hover:bg-surface hover:text-primary transition-all flex items-center justify-center">
                    See our work
                  </a>
                </div>
              </div>
              <div className="hidden lg:block lg:w-[45%] relative opacity-0 -my-16" id="hero-front-img-container">
                <CanvasSequence 
                  frameCount={73} 
                  framePath={getFramePath} 
                  className="w-full aspect-[4/5] object-cover rounded-sm mix-blend-screen scale-[1.3] transform origin-top" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-32 bg-surface">
          <div className="container mx-auto px-4">
            <div className="service-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5 border border-primary/5 shadow-sm">
              <div className="service-card p-12 group">
                <div className="wash"></div>
                <div className="icon-box w-14 h-14 bg-accent/10 flex items-center justify-center mb-10 rounded-sm"><Printer className="text-accent w-8 h-8" /></div>
                <h3 className="text-2xl font-display uppercase font-bold mb-4">Print</h3>
                <p className="text-muted text-sm mb-10 leading-relaxed">World-class screen printing and DTG for t-shirts and hoodies.</p>
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-accent transition-colors">Configure & Price <ChevronRight className="w-3.5 h-3.5" /></span>
              </div>
              <div className="service-card p-12 group">
                <div className="wash"></div>
                <div className="icon-box w-14 h-14 bg-accent/10 flex items-center justify-center mb-10 rounded-sm"><Feather className="text-accent w-8 h-8" /></div>
                <h3 className="text-2xl font-display uppercase font-bold mb-4">Stitch</h3>
                <p className="text-muted text-sm mb-10 leading-relaxed">High-thread-count custom embroidery for headwear and polos.</p>
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-accent transition-colors">Configure & Price <ChevronRight className="w-3.5 h-3.5" /></span>
              </div>
              <div className="service-card p-12 group">
                <div className="wash"></div>
                <div className="icon-box w-14 h-14 bg-accent/10 flex items-center justify-center mb-10 rounded-sm"><Layers className="text-accent w-8 h-8" /></div>
                <h3 className="text-2xl font-display uppercase font-bold mb-4">Stick</h3>
                <p className="text-muted text-sm mb-10 leading-relaxed">Durable die-cut stickers and vinyl decals that last through the tour.</p>
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-accent transition-colors">Configure & Price <ChevronRight className="w-3.5 h-3.5" /></span>
              </div>
              <div className="service-card p-12 group">
                <div className="wash"></div>
                <div className="icon-box w-14 h-14 bg-accent/10 flex items-center justify-center mb-10 rounded-sm"><Monitor className="text-accent w-8 h-8" /></div>
                <h3 className="text-2xl font-display uppercase font-bold mb-4">Sign</h3>
                <p className="text-muted text-sm mb-10 leading-relaxed">Vinyl window signs and large-format graphics that grab attention.</p>
                <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-accent transition-colors">Configure & Price <ChevronRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Stats */}
        <section className="bg-primary py-24 overflow-hidden border-y border-white/5">
          <div className="container mx-auto px-4 mb-20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="stat-item flex flex-col items-center justify-center">
                <div className="text-7xl md:text-9xl font-display font-black text-white/10 mb-4 flex items-center justify-center">
                  <span className="count text-accent" data-target="20">20</span><span className="text-accent-light">+</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-surface/40 text-center">Years in Jacksonville</p>
              </div>
              <div className="stat-item flex flex-col items-center justify-center">
                <div className="text-7xl md:text-9xl font-display font-black text-white/10 mb-4 flex items-center justify-center">
                  <span className="count text-accent" data-target="100">100</span><span className="text-accent-light">%</span>
                </div>
                <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-surface/40 text-center">Customer Recommendation</p>
              </div>
            </div>
          </div>
          <div className="opacity-30">
            <Marquee duration={40} contentClassName="gap-24">
              <span className="text-4xl text-surface font-black uppercase tracking-tighter">SCREEN PRINTING</span>
              <span className="text-4xl text-accent font-black uppercase tracking-tighter">EMBROIDERY</span>
              <span className="text-4xl text-surface font-black uppercase tracking-tighter">STICKERS</span>
              <span className="text-4xl text-accent font-black uppercase tracking-tighter">SIGNS</span>
            </Marquee>
          </div>
        </section>

        {/* For Whom */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="tilt-container">
              <div className="wipe-card relative h-[500px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Rock Band on Stage" />
                <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&fit=crop" className="image-2 absolute inset-0 w-full h-full object-cover" alt="Band Merch" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10">
                  <h3 className="text-3xl text-surface font-display font-black uppercase mb-3">For Bands</h3>
                  <a href="#" className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">See our tour packs <ArrowRight className="w-4 h-4" /></a>
                </div>
              </div>
              <div className="wipe-card relative h-[500px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Streetwear Brand" />
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&fit=crop" className="image-2 absolute inset-0 w-full h-full object-cover" alt="Brand Apparel" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10">
                  <h3 className="text-3xl text-surface font-display font-black uppercase mb-3">For Brands</h3>
                  <a href="#" className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">Scale your brand <ArrowRight className="w-4 h-4" /></a>
                </div>
              </div>
              <div className="wipe-card relative h-[500px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="University Campus" />
                <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=800&fit=crop" className="image-2 absolute inset-0 w-full h-full object-cover" alt="School Mascot Shirt" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10">
                  <h3 className="text-3xl text-surface font-display font-black uppercase mb-3">For Schools</h3>
                  <a href="#" className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">Get team gear <ArrowRight className="w-4 h-4" /></a>
                </div>
              </div>
              <div className="wipe-card relative h-[500px] overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Modern Business" />
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&fit=crop" className="image-2 absolute inset-0 w-full h-full object-cover" alt="Corporate Office" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10">
                  <h3 className="text-3xl text-surface font-display font-black uppercase mb-3">For Businesses</h3>
                  <a href="#" className="inline-flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">Workplace uniform <ArrowRight className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-32 bg-surface">
          <div className="container mx-auto px-4 mb-20 text-center">
            <h4 className="text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-4">Trusted By The Best</h4>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">Bands & Brands</h2>
          </div>

          <div className="relative overflow-hidden mb-32 h-20">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10"></div>
            <Marquee duration={50} contentClassName="gap-24 pr-24 grayscale opacity-40">
              <span className="text-2xl font-display font-black italic tracking-tighter">JACKSONVILLE GIANTS</span>
              <span className="text-2xl font-display font-black italic tracking-tighter">BOLD CITY BREWERY</span>
              <span className="text-2xl font-display font-black italic tracking-tighter">THE FLORIDA THEATRE</span>
              <span className="text-2xl font-display font-black italic tracking-tighter">SUN-RAY CINEMA</span>
              <span className="text-2xl font-display font-black italic tracking-tighter">INTUITION ALE WORKS</span>
              <span className="text-2xl font-display font-black italic tracking-tighter">JAX BEACH SURF SHOP</span>
            </Marquee>
          </div>

          <div className="container mx-auto px-4 text-center">
            <GoogleReviews placeId={import.meta.env.VITE_GOOGLE_PLACE_ID || ""} apiKey={import.meta.env.VITE_GOOGLE_API_KEY || ""} />

            <p className="text-sm text-surface/40 mt-8 mb-8 italic">
              Don't have a place ID yet. Live reviews will be visible once we add it to the .env file.
            </p>
          </div>
        </section>

        {/* Portfolio Gallery */}
        <section id="work" className="py-32 bg-primary overflow-hidden">
          <div className="container mx-auto px-4 mb-16"><h2 className="text-4xl text-surface font-display font-black uppercase tracking-tighter">The Gallery</h2></div>
          <Marquee duration={30} className="mb-8" contentClassName="gap-4 pr-4">
            {GALLERY_1.map((src, i) => <img key={i} src={src} className="w-80 h-80 object-cover rounded-sm grayscale hover:grayscale-0 transition-all flex-shrink-0 [backface-visibility:hidden]" />)}
          </Marquee>
          <Marquee duration={30} direction="right" contentClassName="gap-4 pr-4">
            {GALLERY_2.map((src, i) => <img key={i} src={src} className="w-80 h-80 object-cover rounded-sm grayscale hover:grayscale-0 transition-all flex-shrink-0 [backface-visibility:hidden]" />)}
          </Marquee>
        </section>

        {/* Meet Steve */}
        <section className="py-40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div id="steve-portrait" className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
                  <img src="/public/steve.jpg" alt="Steve Harmon" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
              <div id="steve-content">
                <h4 className="text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-8">Locally Owned</h4>
                <h2 className="text-6xl md:text-7xl font-display font-black uppercase tracking-tighter mb-12 italic">Meet Steve & the Crew</h2>
                <div className="space-y-8">
                  <p id="steve-quote" className="text-3xl font-display font-bold text-primary italic leading-tight">"Twenty years in, we still treat every job like it's our first."</p>
                  <p className="text-muted leading-relaxed text-lg max-w-lg">Absolute Graphics isn't just a business; it's a staple of the Jax creative community. We've grown from a single manual press to a powerhouse shop shipping nationwide.</p>
                </div>
                <div className="mt-16 flex items-center gap-6"><div className="w-16 h-[2px] bg-accent"></div><span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Steve Harmon, Owner</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="quote" className="py-40 bg-primary relative overflow-hidden">
          <div id="cta-glow" className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent-light/10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-6xl md:text-9xl text-surface font-display font-black uppercase tracking-tighter mb-12 leading-none">Ready to <br /><span className="text-accent italic">print?</span></h2>
            <p className="text-surface/50 text-2xl max-w-2xl mx-auto mb-16">Get an instant quote in under <span id="wink-timer" className="text-surface font-mono font-bold">{timeLeft}</span> seconds.</p>
            <MagneticButton as="a" href="#" strength={40} className="inline-block bg-accent text-surface px-16 py-8 rounded-sm text-xl font-black uppercase tracking-[0.25em] hover:bg-accent-light transition-all shadow-2xl">
              Get a Quote Now
            </MagneticButton>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-surface pt-32 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <img src="/public/logo.png" alt="Absolute Graphics Co" className="h-16 w-auto brightness-0 invert" />
              <p className="text-surface/60 text-sm leading-relaxed max-w-xs font-display italic">
                The gold standard for bands and brands in the Southeast. Printed with pride in Jacksonville, Florida since 1999.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="w-4 h-4 text-surface" /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent transition-colors"><Facebook className="w-4 h-4 text-surface" /></a>
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-accent">Capabilities</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Screen Printing</a></li>
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Custom Embroidery</a></li>
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Large Format Signs</a></li>
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Stickers & Decals</a></li>
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Tour Merch Packs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-accent">Resources</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Quote Calculator</a></li>
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Artwork guidelines</a></li>
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Shipping & Returns</a></li>
                <li><a href="#" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8 text-accent">Contact</h5>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <span className="text-surface/50 text-sm leading-relaxed">2199 Forest St <br />Jacksonville, FL 32204</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-accent" />
                  <a href="tel:9046933191" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">(904) 693-3191</a>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-accent" />
                  <a href="mailto:info@absolutegraphicsjax.com" className="text-surface/50 hover:text-surface transition-colors text-sm font-medium">info@absolutegraphicsjax.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-surface/20">© {new Date().getFullYear()} Absolute Graphics Jax, LLC.</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-surface/20 flex items-center gap-2">Built with <Heart className="w-3 h-3 text-accent fill-accent" /> by <a href="https://greenrockhosting.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GreenRock Creative</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
