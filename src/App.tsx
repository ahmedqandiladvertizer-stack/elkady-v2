/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView 
} from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  CheckCircle2, 
  Globe, 
  Stethoscope, 
  Clock, 
  Users, 
  Award, 
  Star, 
  ArrowLeft, 
  Smartphone, 
  MessageSquare, 
  Send,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Trophy,
  ArrowUpRight,
  ShieldCheck,
  FileCheck,
  CalendarCheck,
  Zap
} from 'lucide-react';

const COLORS = {
  primary: '#050505',
  accent: '#ff8c00',
  accentSecondary: '#FF6100',
  blue: '#0E26D8',
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.7)',
  glass: 'rgba(255,255,255,0.06)',
  glassBorder: 'rgba(255,255,255,0.12)',
};

const TRANSITION = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

// Types for components
interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'لماذا نحن', href: '#why-us' },
  { name: 'النتائج', href: '#results' },
  { name: 'تواصل معنا', href: '#contact' },
];

const services = [
  {
    title: 'خدمات الداتافلو الطبي',
    desc: 'تدقيق كامل للوثائق والشهادات لضمان القبول في الهيئات الصحية الخليجية والدولية بدقة متناهية.',
    icon: <FileCheck />,
    features: ['سرعة في الإنجاز', 'دقة في التوثيق', 'متابعة لحظية'],
    color: 'from-orange-500/20 to-transparent'
  },
  {
    title: 'حجز البرومترك والبيرسون',
    desc: 'تسهيل عمليات الحجز والاختبار في مراكز البرومترك العالمية لجميع التخصصات الطبية المعتمدة.',
    icon: <CalendarCheck />,
    features: ['مواعيد مرنة', 'مساعدة في التسجيل', 'اختيار أقرب مركز'],
    color: 'from-blue-500/20 to-transparent'
  },
  {
    title: 'الاعتماد المهني والترخيص',
    desc: 'دعم كامل لاستخراج تراخيص مزاولة المهنة في كافة دول الخليج العربي وتوثيق الأوراق الرسمية.',
    icon: <ShieldCheck />,
    features: ['دعم فني كامل', 'كافة دول الخليج', 'استشارات مهنية'],
    color: 'from-green-500/20 to-transparent'
  },
  {
    title: 'كورسات البرومترك للصيادلة',
    desc: 'إعداد الكوادر الصيدلانية لاجتياز اختبارات البرومترك بفاعلية من خلال مناهج تعليمية متخصصة.',
    icon: <Stethoscope />,
    features: ['مناهج معتمدة', 'أسئلة سابقة', 'شرح مفصل'],
    color: 'from-purple-500/20 to-transparent'
  },
  {
    title: 'متابعة الملفات الطبية',
    desc: 'متابعة دورية ولحظية لكل تحديث في ملفك المهني مع الهيئات الصحية لضمان سرعة صدور الترخيص.',
    icon: <Clock />,
    features: ['تحديثات مستمرة', 'حل المشكلات', 'تواصل مباشر'],
    color: 'from-accent-orange/20 to-transparent'
  },
  {
    title: 'تجهيز أوراق السفر',
    desc: 'استشارات متكاملة لتجهيز كافة المستندات اللازمة للسفر والعمل في دول الخليج بكل سهولة.',
    icon: <Globe />,
    features: ['تجهيز كامل', 'توفير المجهود', 'خبرة قانونية'],
    color: 'from-red-500/20 to-transparent'
  },
];

const stats = [
  { label: 'عميل سعيد بكافة التخصصات', value: 500, suffix: '+' },
  { label: 'سنوات من الخبرة والاحترافية', value: 5, suffix: '+' },
  { label: 'ملف تم إنجازه بنجاح', value: 1000, suffix: '+' },
  { label: 'دول نغطيها في الخليج العربي', value: 5, suffix: '+' },
];

const testimonials = [
  {
    name: 'د. أحمد محمود',
    role: 'طبيب عام - السعودية',
    content: 'تجربة احترافية جداً مع القاضي داتا فلو. قاموا بإنهاء ملف الداتافلو الخاص بي في وقت قياسي وبدقة متناهية. أنصح بهم بشدة لكل الزملاء.',
    rating: 5,
  },
  {
    name: 'د. سارة عادل',
    role: 'صيدلانية - الإمارات',
    content: 'خدمة عملاء ممتازة واستجابة سريعة. ساعدوني في حجز البرومترك وتجهيز أوراق التصنيف المهني بكل سهولة. شكراً جزيلاً للفريق.',
    rating: 5,
  },
  {
    name: 'أ. محمد خالد',
    role: 'أخصائي تمريض - عمان',
    content: 'المصداقية هي أهم ما يميز الشركة. التزموا بالمواعيد وقدموا دعماً مستمراً حتى حصلت على الترخيص. أفضل قرار اتخذته.',
    rating: 5,
  },
];

const AnimationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: TRANSITION },
  },
  stagger: {
    visible: { transition: { staggerChildren: 0.1 } },
  },
  card: {
    hover: { 
      y: -10, 
      boxShadow: "0 20px 40px rgba(255, 140, 0, 0.15)",
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
};

const SectionSeparator = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 opacity-50" />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 py-5 ${
        scrolled ? 'nav-glass' : 'bg-transparent'
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-orange to-accent-blue rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Trophy className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-white to-gray-400">
              القاضي <span className="text-accent-orange">داتا فلو</span>
            </span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium text-white/70 hover:text-accent-orange transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="https://wa.me/201011016779"
            target="_blank"
            rel="noreferrer"
            className="btn-glow px-6 py-2.5 rounded-full text-white font-bold text-sm hover:scale-105 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            اتصل بنا الآن
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-6 lg:hidden"
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-white hover:text-[#ff8c00]"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="https://wa.me/201011016779"
              className="w-full py-4 text-center bg-[#ff8c00] rounded-xl text-white font-bold text-lg"
            >
              ابدأ رحلتك المهنية
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;
      const totalDuration = 2000;
      const incrementTime = totalDuration / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={nodeRef} className="text-4xl md:text-5xl font-black text-white">
      {count}{suffix}
    </span>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="bg-bg text-white min-h-screen selection:bg-accent-orange selection:text-white overflow-x-hidden" dir="rtl">
      {/* Global Style Inject */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap');
        
        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Cairo', sans-serif;
        }

        .luxury-text-gradient {
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .carbon-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 right-0 left-0 h-1 bg-gradient-to-r from-accent-orange to-accent-blue z-[110] origin-right"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Mesh Background */}
      <div className="mesh-bg">
        <div className="blob-orange"></div>
        <div className="blob-blue"></div>
        <div className="absolute inset-0 carbon-texture opacity-30" />
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/201011016779"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-600/40 cursor-pointer"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-[#25D366] rounded-full opacity-30"
        />
        <MessageSquare className="text-white w-7 h-7 fill-white/20" />
      </motion.a>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={AnimationVariants.stagger}
            className="text-right"
          >
            <motion.div 
              variants={AnimationVariants.fadeUp}
              className="inline-block px-4 py-1.5 rounded-full glass-card text-accent-orange text-xs font-bold mb-4 uppercase tracking-widest"
            >
              <Zap className="w-4 h-4 fill-accent-orange" />
              الاعتماد المهني الطبي الأول في الوطن العربي
            </motion.div>

            <motion.h1 
              variants={AnimationVariants.fadeUp}
              className="text-3xl md:text-5xl font-extrabold leading-[1.2] tracking-tight mb-8"
            >
              صمم مستقبلك <br />
              <span className="text-accent-orange">المهني العالمي</span>
            </motion.h1>

            <motion.p 
              variants={AnimationVariants.fadeUp}
              className="text-xl text-white/70 leading-relaxed max-w-xl ml-auto mb-12"
            >
              نحن جسرك الآمن للعمل في دول الخليج. خدمات الداتافلو والبرومترك والاعتماد المهني بأعلى معايير الجودة والاحترافية والسرعة.
            </motion.p>

            <motion.div 
              variants={AnimationVariants.fadeUp}
              className="flex flex-wrap gap-4 justify-start"
            >
              <a 
                href="#contact"
                className="px-8 py-4 bg-white text-black font-extrabold rounded-2xl flex items-center gap-3 hover:bg-accent-orange transition-all shadow-xl whitespace-nowrap"
              >
                <Phone className="w-5 h-5 ltr" />
                استشارة مجانية
              </a>
              <a 
                href="#services"
                className="px-8 py-4 glass-card font-bold rounded-2xl whitespace-nowrap"
              >
                تصفح خدماتنا
              </a>
            </motion.div>

            <motion.div 
              variants={AnimationVariants.fadeUp}
              className="flex gap-12 pt-8 border-t border-white/10 mt-12"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold">+500</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">عميل سعيد</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold">+1000</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">ملف منجز</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold">+5</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">سنوات خبرة</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4"
          >
            <div className="glass-card p-6 flex items-start gap-5 transform translate-x-12 rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="bg-accent-orange/20 p-4 rounded-2xl">
                <FileCheck className="w-8 h-8 text-accent-orange" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white">خدمات الداتافلو</h3>
                <p className="text-sm text-white/60">توثيق كامل للشهادات والخبرات لدى الهيئات الصحية العالمية.</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-5 transform -translate-x-8 -rotate-1 hover:rotate-0 transition-all duration-500">
              <div className="bg-accent-blue/20 p-4 rounded-2xl">
                <CalendarCheck className="w-8 h-8 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white">حجز البرومترك</h3>
                <p className="text-sm text-white/60">تسهيل إجراءات حجز الاختبارات في أسرع وقت ممكن.</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-5 transform translate-x-4 rotate-1 hover:rotate-0 transition-all duration-500">
              <div className="bg-white/10 p-4 rounded-2xl">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-white">الاعتماد المهني</h3>
                <p className="text-sm text-white/60">دعم كامل لاستخراج تراخيص مزاولة المهنة في دول الخليج.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="mb-4 inline-block">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 font-medium group-hover:text-[#ff8c00] transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* About Us */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={TRANSITION}
            >
              <div className="text-[#ff8c00] font-black tracking-widest text-sm uppercase mb-6 flex items-center gap-3">
                <span className="w-12 h-0.5 bg-[#ff8c00]"></span>
                تميز يدوم طويلاً
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-8 leading-tight text-white">القاضي داتا فلو: <br /><span className="text-accent-orange">نصنع مستقبلك المهني</span></h2>
              <div className="space-y-6 text-white/70 text-lg leading-loose">
                <p>
                  شركة القاضي داتا فلو متخصصة في تقديم حلول متكاملة للكوادر الطبية الراغبة في توثيق شهادتها والاعتماد المهني للعمل في دول الخليج العربي (السعودية، الإمارات، قطر، عمان، البحرين).
                </p>
                <p>
                  منذ تأسيسنا، ونحن نضع نصب أعيننا تسهيل الإجراءات الإدارية والمهنية المعقدة، من خلال فريق من الخبراء المتمرسين في التعامل مع هيئات الداتافلو والبرومترك.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="p-6 glass-card transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-accent-orange rounded-xl flex items-center justify-center mb-6">
                    <Trophy className="text-white w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">رؤيتنا</h4>
                  <p className="text-sm text-white/60">أن نصبح الوجهة الأولى والموثوقة لكل ممارس صحي يبحث عن التميز والعمل العالمي.</p>
                </div>
                <div className="p-6 glass-card transform hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-accent-blue rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheck className="text-white w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">قيمنا</h4>
                  <p className="text-sm text-white/60">نؤمن بالشفافية الكاملة، السرعة في الإنجاز، والدعم غير المحدود لعملائنا.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              {/* Complex Layout Shapes */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c00]/20 to-[#0E26D8]/20 blur-3xl opacity-30 rounded-full" />
              <div className="relative z-10 w-full h-full glass-card overflow-hidden flex items-center justify-center group">
                <div className="p-12 text-center">
                  <div className="mb-8 p-10 bg-white/5 rounded-full border border-white/10 inline-block group-hover:scale-110 transition-transform duration-700">
                    <Users className="w-32 h-32 text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <Stethoscope className="w-24 h-24 text-accent-orange" />
                  </div>
                  <h3 className="text-3xl font-black mb-6">فريق طبي وإداري متخصص</h3>
                  <div className="flex justify-center gap-4">
                     <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/60">دقة</span>
                     <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/60">سرعة</span>
                     <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/60">أمان</span>
                  </div>
                </div>
              </div>
              
              {/* Small floating card */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -bottom-8 -right-8 glass-card p-6 shadow-2xl z-20"
              >
                <div className="text-5xl font-black text-accent-orange mb-2">+5</div>
                <div className="text-sm font-bold text-white/70">سنوات من الثقة</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-2xl md:text-4xl font-black mb-8 leading-tight text-white">خدمات <span className="text-accent-orange">نصممها</span> لتحقيق طموحك</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium">نقدم باقة متكاملة من الخدمات الإدارية والمهنية للكوادر الطبية، نضمن لك سلاسة الإجراءات من البداية وحتى استلام ترخيص العمل.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={AnimationVariants.card}
                whileHover="hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card hover:border-accent-orange/40 transition-all duration-500 flex flex-col group overflow-hidden"
              >
                {/* Visual Area (Top) */}
                <div className={`relative h-64 w-full bg-gradient-to-br ${service.color} overflow-hidden`}>
                  <div className="absolute inset-0 carbon-texture opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                      {React.cloneElement(service.icon as React.ReactElement, { className: 'w-12 h-12 text-accent-orange' })}
                    </div>
                  </div>
                  {/* Floating Icon Over Image */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center shadow-2xl">
                    <Zap className="w-5 h-5 text-accent-orange fill-accent-orange/20" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-xl font-black mb-6 text-white group-hover:text-accent-orange transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  {/* Features List */}
                  <div className="space-y-4 mb-10 mt-auto">
                    {(service as any).features?.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-accent-orange" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <a 
                      href="#contact" 
                      className="text-white group-hover:text-accent-orange font-bold text-sm flex items-center gap-2 transition-colors group/link"
                    >
                      اطلب الخدمة الآن
                      <ChevronLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="lg:w-1/2"
            >
              <h2 className="text-2xl md:text-3xl font-black mb-12 leading-tight text-white">لماذا يختارنا <br /><span className="text-accent-orange">نخبة الكوادر الطبية؟</span></h2>
              
              <div className="space-y-8">
                {[
                  { title: 'خبرة متراكمة', desc: 'فريق متخصص بخبرة سنوات في التعامل مع منصات DPC وDataflow.' },
                  { title: 'سرعة الإنجاز', desc: 'نحن ندرك قيمة وقتك، لذا نعمل بأقصى سرعة لإنهاء المتابعات اليومية.' },
                  { title: 'دعم فني مستمر', desc: 'خدمة عملاء جاهزة للرد على استفساراتك على مدار الساعة عبر واتساب وهاتف.' },
                  { title: 'سهولة الدفع', desc: 'نوفر طرق دفع متعددة ومتاحة داخل وخارج مصر لتسهيل التعامل.' },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="mt-1 w-8 h-8 rounded-full border-2 border-[#ff8c00] flex-shrink-0 flex items-center justify-center text-[#ff8c00]">
                      <CheckCircle2 className="w-5 h-5 fill-[#ff8c00]/10" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="h-64 glass-card flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-accent-orange/10 to-transparent">
                  <Globe className="w-16 h-16 text-accent-orange mb-6 animate-pulse" />
                  <h5 className="font-bold text-white">تغطية شاملة للخليج</h5>
                </div>
                <div className="h-80 glass-card p-8 flex flex-col justify-end bg-gradient-to-t from-accent-blue/10 to-transparent">
                  <Star className="w-12 h-12 text-yellow-500 mb-6" />
                  <h5 className="text-2xl font-black mb-4 text-white">تقييم ممتاز</h5>
                  <p className="text-xs text-white/40">نال فريقنا ثقة الأطباء في مصر والخليج بفضل جودة الخدمة.</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-80 glass-card p-8 bg-gradient-to-br from-accent-orange/5 to-accent-blue/5 flex flex-col items-center justify-center group pointer-events-none">
                  <div className="w-24 h-24 rounded-full border-4 border-accent-orange/20 border-t-accent-orange animate-spin mb-6" />
                  <div className="text-3xl font-black mb-2 tracking-tighter text-white">0%</div>
                  <div className="text-xs font-bold text-white/40 uppercase">نسبة الأخطاء</div>
                </div>
                <div className="h-64 glass-card p-8 flex flex-col justify-between">
                  <Users className="w-10 h-10 text-accent-blue opacity-50" />
                  <h5 className="text-lg font-bold leading-tight text-white">دعم مخصص لكل ملف على حدة</h5>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 right-0 w-[40%] h-[40%] bg-blue-600 opacity-[0.03] blur-[150px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">قالوا عنا <span className="text-accent-orange">عملائنا</span></h2>
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-accent-orange to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-3xl glass-dark border border-white/10 hover:border-white/20 transition-all flex flex-col h-full"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ff8c00] text-[#ff8c00]" />
                  ))}
                </div>
                <p className="text-lg text-white/80 font-medium mb-10 flex-grow leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center text-2xl font-black text-[#ff8c00]">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{t.name}</h5>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-24 rounded-[3rem] bg-gradient-to-br from-[#111] to-[#000] border border-white/10 relative overflow-hidden text-center group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff8c00]/20 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-black mb-10 leading-tight">مستعد للبدء في رحلتك المهنية؟</h2>
              <p className="text-xl text-white/50 mb-14 max-w-2xl leading-relaxed">انضم لأكثر من 500 طبيب وصيدلي أتموا إجراءاتهم معنا بنجاح تام. نحن هنا لضمان مستقبلك.</p>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <a 
                  href="https://wa.me/201011016779"
                  target="_blank"
                  rel="noreferrer"
                  className="px-12 py-6 bg-[#ff8c00] rounded-full text-white text-xl font-bold shadow-[0_20px_50px_rgba(255,140,0,0.3)] hover:shadow-[0_25px_60px_rgba(255,140,0,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  <MessageSquare className="w-6 h-6" />
                  تواصل عبر واتساب الآن
                </a>
              </div>
              <div className="mt-12 flex gap-8 items-center text-white/40 text-sm">
                <div className="flex items-center gap-2 transition-colors hover:text-white cursor-default">
                   <ShieldCheck className="w-4 h-4" />
                   بياناتك في أمان تام
                </div>
                <div className="flex items-center gap-2 transition-colors hover:text-white cursor-default">
                   <Clock className="w-4 h-4" />
                   متابعة لحظية للملف
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-black mb-12 text-white">كن على <span className="text-accent-orange">تواصل</span> معنا</h2>
              <p className="text-white/60 text-lg mb-12 leading-loose italic">نحن دائماً بالقرب منك، يسعدنا استقبال استفساراتك وتقديم المشورة المهنية لك في أي وقت.</p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-center group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#ff8c00]/20 transition-colors">
                    <Phone className="text-[#ff8c00] w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-white/40 text-sm mb-1">اتصل بنا أو واتساب</h5>
                    <p className="text-2xl font-bold text-white ltr">+201011016779</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-center group cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#ff8c00]/20 transition-colors">
                    <Globe className="text-[#ff8c00] w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-white/40 text-sm mb-1">موقعنا الإلكتروني</h5>
                    <p className="text-2xl font-bold text-white">elkadydataflow.com</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-12">
                   {[
                     { icon: <Facebook />, link: 'https://www.facebook.com/elkadydataflowpage' },
                     { icon: <Instagram />, link: 'https://www.instagram.com/elkadydataflow/' },
                     { icon: <Youtube />, link: 'https://www.youtube.com/channel/UCW2tEKsL22JqlHom8mSNGlA' },
                     { icon: <Smartphone />, link: 'https://www.tiktok.com/@elkady.dataflow' }
                   ].map((social, i) => (
                     <a 
                      key={i} 
                      href={social.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-white/50 hover:text-accent-orange hover:border-accent-orange/50 transition-all duration-300"
                     >
                       {React.cloneElement(social.icon as React.ReactElement, { className: 'w-5 h-5' })}
                     </a>
                   ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 relative"
            >
              <div className="absolute top-10 left-10 w-32 h-32 bg-accent-orange/5 blur-3xl" />
              <form onSubmit={e => e.preventDefault()} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white/50 block">الاسم بالكامل</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all placeholder:text-white/10" placeholder="أدخل اسمك هنا" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white/50 block">رقم الهاتف / واتساب</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all placeholder:text-white/10" placeholder="010XXXXXXXX" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white/50 block">التخصص الطبي</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all appearance-none text-white/40">
                    <option>اختر التخصص</option>
                    <option>طبيب بشري</option>
                    <option>صيدلي</option>
                    <option>تمريض</option>
                    <option>فني مختبرات</option>
                    <option>تخصصات أخرى</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white/50 block">كيف يمكننا مساعدتك؟</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all placeholder:text-white/10" placeholder="اكتب استفسارك هنا بالتفصيل..."></textarea>
                </div>
                <button className="btn-glow w-full py-5 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95">
                  إرسال الاستفسار
                  <Send className="w-5 h-5 ltr" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 uppercase tracking-widest font-bold">
        <div className="mb-4 md:mb-0">© {new Date().getFullYear()} ELKADY DATAFLOW. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6">
          <span>السعودية</span>
          <span>الإمارات</span>
          <span>عمان</span>
          <span>قطر</span>
        </div>
      </footer>
    </div>
  );
}
