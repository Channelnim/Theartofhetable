/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { 
  ChevronDown, 
  Menu, 
  X,
  ArrowRight,
  Award,
  History,
  GraduationCap,
  LucideIcon,
  Calendar as CalendarIcon
} from 'lucide-react';

// --- Constants & Data ---

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1920"
];

const EVENT_CATEGORIES = [
  {
    title: "Grand Celebrations",
    subtitle: "ANNIVERSARIES",
    description: "Bespoke menus designed to reflect your unique love story with elegance and grace.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Seasonal Galas",
    subtitle: "HOLIDAY",
    description: "Transform your festive gatherings into a winter wonderland of gourmet delights.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Exquisite Socials",
    subtitle: "PRIVATE SOCIALS",
    description: "From high-stakes race days to intimate soirées, we bring the ultimate luxury vibe.",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Executive Excellence",
    subtitle: "CORPORATE RETREATS & LAUNCHES",
    description: "Elevating professional gatherings with precision, discretion, and culinary distinction.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Bespoke Private Dining",
    subtitle: "INTIMATE HOME GATHERINGS",
    description: "A personalized chef experience in the comfort of your own residence.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Milestone Moments",
    subtitle: "BIRTHDAYS & GRADUATIONS",
    description: "Celebrating achievements with sophisticated flavors and impeccable service.",
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&q=80&w=1200"
  }
];

const EVENT_TYPES = [
  "Anniversary",
  "Holiday",
  "Corporate Event",
  "Private Home Dining",
  "Social Soirée",
  "Milestone Celebration",
  "Other"
];

// --- Helper Components ---

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        onUpdate: (latest) => setCount(Math.floor(latest)),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref} className="text-7xl font-serif leading-none">{count}</span>;
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// --- Main Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; // 헤더 높이만큼 여백
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-sm py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* 데스크탑 메뉴 */}
        <div className="flex-1 hidden md:flex gap-10">
          <button onClick={() => scrollTo('thechef')} className={`text-[10px] uppercase tracking-[0.5em] font-medium transition-all ${isScrolled ? 'text-black' : 'text-white'}`}>The Chef</button>
          <button onClick={() => scrollTo('experiences')} className={`text-[10px] uppercase tracking-[0.5em] font-medium transition-all ${isScrolled ? 'text-black' : 'text-white'}`}>Experiences</button>
        </div>
        
        {/* 로고 */}
        <div className="flex-shrink-0 text-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group focus:outline-none">
            <h1 className={`text-xl md:text-2xl font-serif tracking-[0.2em] uppercase transition-all duration-700 ${isScrolled ? 'text-black' : 'text-white'}`}>Chris Whirlow</h1>
            <p className={`text-[8px] uppercase tracking-[0.5em] mt-1 transition-all duration-700 ${isScrolled ? 'text-black/40' : 'text-white/60'}`}>THE ART of THE TABLE</p>
          </button>
        </div>

        {/* 데스크탑 Inquiry 버튼 (물결 애니메이션 유지) */}
        <div className="flex-1 hidden md:flex justify-end items-center">
          <button 
            onClick={() => scrollTo('inquiry')} 
            className={`btn-wavy px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold border transition-all ${isScrolled ? 'border-black/20 text-black' : 'border-white/30 text-white'}`}
          >
            Inquiry
          </button>
        </div>

        {/* 모바일 햄버거 */}
        <button className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-t py-12 px-6 flex flex-col gap-10 md:hidden shadow-2xl"
          >
            <button onClick={() => scrollTo('thechef')} className="text-[11px] uppercase tracking-[0.5em] font-bold text-black">The Chef</button>
            <button onClick={() => scrollTo('experiences')} className="text-[11px] uppercase tracking-[0.5em] font-bold text-black">Experiences</button>
            <button onClick={() => scrollTo('inquiry')} className="text-[11px] uppercase tracking-[0.5em] font-bold text-black">Inquiry</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_IMAGES[currentImage]} 
            alt="Culinary Masterpiece" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <Reveal>
          <div className="mb-6">
            <h2 className="text-5xl md:text-9xl font-serif tracking-[0.1em] uppercase text-white drop-shadow-[0_30px_60px_rgba(0,0,0,1)]">
              THE ART <span className="italic lowercase font-serif tracking-normal">of</span> THE TABLE.
            </h2>
          </div>
          <div className="w-20 h-[1px] bg-white/60 mx-auto my-10" />
          <p className="text-white text-[12px] md:text-[16px] tracking-[0.2em] font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Every Dish Tells a Story. Every Moment, Unforgettable.<br />
            With four decades of mastery behind every plate, the only thing you'll remember is how perfect it felt.
          </p>
          <div className="mt-12">
            <button 
              onClick={() => {
                const element = document.getElementById('inquiry');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-white hover:text-black transition-all duration-700 group"
            >
              Begin Your Experience
            </button>
          </div>
        </Reveal>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 cursor-pointer group"
          onClick={() => {
            const element = document.getElementById('thechef');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown className="text-white/60 animate-bounce group-hover:text-white transition-colors" size={36} strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
};

const AboutChef = () => {
  return (
    <section id="thechef" className="py-40 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-center">
          
          {/* Left Side: Image with Overlapping Mastery Box */}
          <div className="lg:col-span-5 space-y-20">
            <div className="relative">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                  <img 
                    src="https://i.postimg.cc/x1njpQQB/Chef-pic.jpg" 
                    alt="Chef Chris Whirlow" 
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
                </div>
              </Reveal>
              
              {/* Mastery Box - Deep Charcoal Overlay (Resized and Repositioned) */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-12 -right-6 lg:-right-12 bg-neutral-950 p-8 lg:p-10 text-white aspect-square flex flex-col items-center justify-center shadow-[-15px_15px_40px_rgba(0,0,0,0.25)] z-10"
                style={{ width: 'clamp(140px, 18vw, 200px)' }}
              >
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl lg:text-5xl font-serif leading-none">
                      <Counter value={40} />
                    </span>
                  </div>
                  <p className="text-[7px] lg:text-[9px] uppercase tracking-[0.4em] font-bold leading-tight mt-4 opacity-60">
                    Years of <br /> Mastery
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 3-Column Icon Grid - Enlarged and Refined */}
            <Reveal delay={0.6}>
              <div className="grid grid-cols-3 pt-16 border-t border-black/10">
                <div className="flex flex-col items-center text-center space-y-6">
                  <History size={32} strokeWidth={0.75} className="text-black/20" />
                  <div className="space-y-3">
                    <p className="font-serif italic text-3xl lg:text-4xl leading-none text-black">1994</p>
                    <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.5em] font-bold text-black/40">ESTABLISHED</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-6">
                  <GraduationCap size={32} strokeWidth={0.75} className="text-black/20" />
                  <div className="space-y-3">
                    <p className="font-serif italic text-3xl lg:text-4xl leading-none text-black">CIA</p>
                    <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.5em] font-bold text-black/40">FOUNDATION</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-6">
                  <Award size={32} strokeWidth={0.75} className="text-black/20" />
                  <div className="space-y-3">
                    <p className="font-serif italic text-3xl lg:text-4xl leading-none text-black">Elite</p>
                    <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.5em] font-bold text-black/40">STANDARD</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Headline Design & Details */}
          <div className="lg:col-span-7 space-y-16">
            <Reveal delay={0.2}>
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-[8px] lg:text-[10px] uppercase tracking-[0.8em] text-black/30 font-bold">
                    CULINARY ARTISTRY
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-block bg-black text-white px-4 py-2">
                      <span className="text-[10px] uppercase tracking-[0.5em] font-bold">
                        EXECUTIVE CHEF
                      </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter leading-[0.9] text-black">
                      Chris <span className="font-light italic">Whirlow.</span>
                    </h2>
                  </div>
                  <div className="w-16 h-px bg-black/10" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="space-y-8 text-black/70 font-light leading-relaxed text-base lg:text-lg max-w-2xl">
                <p>
                  A graduate of the prestigious <span className="text-black font-medium">Culinary Institute of America</span>, Chef Chris Whirlow has spent over four decades doing one thing with unwavering dedication — transforming exceptional ingredients into unforgettable experiences.
                </p>
                <p>
                  His career has taken him from the discipline of classical kitchens to the intimacy of private dining rooms, where every detail is felt and nothing goes unnoticed. What sets Chef Whirlow apart is not only his technical command, but his deep understanding that a great meal is never just about food. It is about the people gathered around the table, the occasion being celebrated, and the memories that linger long after the last course.
                </p>
                
                <div className="py-4">
                  <p className="text-xs lg:text-sm uppercase tracking-[0.6em] text-black font-bold border-y border-black/5 py-6">
                    PRECISION. DISCRETION. ARTISTIC VISION.
                  </p>
                </div>

                <p>
                  These are not simply values — they are the standard Chef Whirlow brings to every engagement. Each menu is thoughtfully composed to reflect the season, the setting, and most importantly, the client. Each dish is executed with the quiet confidence that only forty years of mastery can provide.
                </p>
                
                <p>
                  When you invite Chef Whirlow to your table, you are not simply hiring a caterer. You are entrusting one of your most meaningful moments to someone who treats that privilege with the seriousness — and the artistry — it deserves.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ category, index }: { category: typeof EVENT_CATEGORIES[0], index: number, key?: string }) => {
  return (
    <Reveal delay={index * 0.1}>
      <div className="group relative bg-white overflow-hidden flex flex-col">
        <div className="aspect-[4/5] overflow-hidden relative">
          <img 
            src={category.image} 
            alt={category.title}
            className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        
        <div className="py-12 px-6 text-center">
          <p className="text-[9px] uppercase tracking-[0.4em] font-medium mb-4 text-black/40">
            {category.subtitle}
          </p>
          <h3 className="text-2xl font-serif mb-6 tracking-wide">
            {category.title}
          </h3>
          <div className="w-8 h-[1px] bg-black/20 mx-auto mb-8 transition-all duration-700 group-hover:w-20" />
          <p className="text-sm text-black/60 leading-relaxed font-light italic max-w-xs mx-auto">
            {category.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
};

const InquirySection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select an event date.");
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: format(selectedDate, 'PPP'),
      type: formData.get('type'),
      vision: formData.get('vision')
    };

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      e.currentTarget.reset();
      setSelectedDate(undefined);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("There was an error sending your inquiry. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-40 bg-neutral-950 text-white relative">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-24">
            <p className="text-[11px] uppercase tracking-[0.5em] text-white/30 mb-8">Consultation</p>
            <h2 className="text-4xl md:text-8xl font-serif tracking-tight">Begin Your Journey.</h2>
            <div className="w-16 h-[1px] bg-white/10 mx-auto mt-12" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 ml-1">Full Name</label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="E.g. Julianne Moore"
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 focus:bg-white/10"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 ml-1">Email Address</label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="E.g. julianne@example.com"
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 focus:bg-white/10"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 ml-1">Phone Number</label>
              <input 
                required
                name="phone"
                type="tel" 
                placeholder="E.g. +1 (555) 000-0000"
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 focus:bg-white/10"
              />
            </div>
            
            <div className="space-y-4 relative" ref={calendarRef}>
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 ml-1">Event Date</label>
              <div 
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-sm cursor-pointer flex items-center justify-between hover:bg-white/10 transition-all"
              >
                <span className={selectedDate ? "text-white" : "text-white/20"}>
                  {selectedDate ? format(selectedDate, 'PPP') : "Select a date"}
                </span>
                <CalendarIcon size={14} className="text-white/30" />
              </div>

              <AnimatePresence>
                {isCalendarOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 top-full left-0 mt-2 bg-neutral-900 border border-white/10 p-4 shadow-2xl rounded-sm"
                  >
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setIsCalendarOpen(false);
                      }}
                      className="text-white"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 ml-1">Event Type</label>
              <select 
                required
                name="type"
                defaultValue=""
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-sm focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer focus:bg-white/10"
              >
                <option value="" disabled className="bg-neutral-900">Select an experience</option>
                {EVENT_TYPES.map(type => (
                  <option key={type} value={type} className="bg-neutral-900">{type}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 ml-1">Your Vision</label>
              <textarea 
                required
                name="vision"
                rows={6}
                placeholder="Describe the atmosphere, dietary preferences, and your culinary aspirations..."
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 resize-none focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-2 pt-8">
              <motion.button 
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                className="w-full btn-wavy text-black py-7 text-[11px] uppercase tracking-[0.4em] font-bold transition-all flex items-center justify-center gap-5 group disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
                {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-4 transition-transform" />}
              </motion.button>
            </div>
          </form>
        </Reveal>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitted(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-neutral-900 border border-white/10 p-12 md:p-16 max-w-lg w-full text-center space-y-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsSubmitted(false)}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight">All set!</h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  We've received your inquiry. <br />
                  We'll be in touch with you very soon.
                </p>
              </div>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-200 transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-black selection:text-white bg-white scroll-smooth">
      <Navbar />
      
      <main>
        <Hero />

        <AboutChef />

        {/* Experiences Section */}
        <section id="experiences" className="py-40 px-6 bg-white border-t border-black/5">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-32">
                <p className="text-[11px] uppercase tracking-[0.5em] text-black/40 mb-8">Curated Experiences</p>
                <h2 className="text-4xl md:text-8xl font-serif tracking-tight">Bespoke Events.</h2>
                <div className="w-16 h-[1px] bg-black/10 mx-auto mt-12" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
              {EVENT_CATEGORIES.map((category, idx) => (
                <ExperienceCard key={category.title} category={category} index={idx} />
              ))}
            </div>
          </div>
        </section>

        <InquirySection />
      </main>

      <footer className="bg-neutral-950 pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 pb-32 border-b border-white/5">
            <div className="lg:col-span-6 space-y-10">
              <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
                Let's create <br /> an unforgettable <br /> <span className="italic text-white/40">experience.</span>
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Direct Inquiry</p>
                <a 
                  href="mailto:chris@chriswhirlow.com" 
                  className="text-xl md:text-2xl text-white hover:text-white/60 transition-colors font-light tracking-wide"
                >
                  chris@chriswhirlow.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-8">
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Navigation</p>
              <div className="flex flex-col gap-5">
                {['The Chef', 'Experiences', 'Inquiry'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase().replace(' ', ''));
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-bold">
                Chris Whirlow
              </p>
              <p className="text-[9px] uppercase tracking-[0.4em] text-white/10">
                THE ART <span className="italic lowercase font-serif tracking-normal">of</span> THE TABLE.
              </p>
            </div>
            
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/10">
              © 2026. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute -bottom-20 -right-20 text-[20vw] font-serif italic text-white/[0.02] pointer-events-none select-none">
          Whirlow
        </div>
      </footer>
    </div>
  );
}
