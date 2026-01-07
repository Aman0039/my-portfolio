import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Download,
  Sparkles,
  Code2,
  Palette,
  Rocket,
  Zap,
  Send,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  Star,
  Award,
  Users,
  Coffee
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <div ref={ref}>{count}</div>;
}

// Floating Particles Background
function FloatingParticles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

// Skill Card Component
function SkillCard({ skill, delay }: { skill: any; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            {skill.icon}
          </div>
          <h3 className="font-bold text-lg">{skill.name}</h3>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.2 }}
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
          />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">{skill.level}%</p>
      </div>
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-[450px]"
    >
      <motion.div
        animate={{ rotateY: isHovered ? 5 : 0, rotateX: isHovered ? -5 : 0 }}
        transition={{ duration: 0.3 }}
        className="h-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-full">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 flex flex-wrap gap-2"
            >
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-500/30 backdrop-blur-sm text-white text-xs rounded-full border border-indigo-400/30"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
            <p className="text-slate-300 mb-6">{project.description}</p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex gap-4"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition-all"
              >
                View Project <ExternalLink size={16} />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                <Github size={16} /> Code
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const skills = [
    { name: "React & Next.js", icon: <Code2 size={24} />, level: 95 },
    { name: "TypeScript", icon: <Code2 size={24} />, level: 90 },
    { name: "UI/UX Design", icon: <Palette size={24} />, level: 85 },
    { name: "Node.js", icon: <Zap size={24} />, level: 88 },
    { name: "Tailwind CSS", icon: <Sparkles size={24} />, level: 92 },
    { name: "Motion & Animation", icon: <Rocket size={24} />, level: 87 },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern, full-stack e-commerce solution with real-time inventory, secure payments, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      title: "AI Task Manager",
      description: "Intelligent task management app with AI-powered scheduling and productivity insights.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      tags: ["Next.js", "OpenAI", "Prisma", "Tailwind"],
      link: "https://example.com",
      github: "https://github.com",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for managing multiple social media accounts with real-time metrics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["TypeScript", "React", "Firebase", "Chart.js"],
      link: "https://example.com",
      github: "https://github.com",
    },
  ];

  const stats = [
    { icon: <Award />, value: 50, label: "Projects Completed", suffix: "+" },
    { icon: <Users />, value: 30, label: "Happy Clients", suffix: "+" },
    { icon: <Star />, value: 5, label: "Years Experience", suffix: "+" },
    { icon: <Coffee />, value: 1000, label: "Cups of Coffee", suffix: "+" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // Simulate sending
    setTimeout(() => {
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 text-slate-900 dark:text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              Portfolio
            </motion.h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="px-6 py-4 space-y-4">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6"
            >
              <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Available for freelance
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Alex Morgan
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              A passionate <strong>Full-Stack Developer</strong> & <strong>UI/UX Designer</strong> crafting 
              beautiful, performant web experiences that users love.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                View My Work <ArrowRight size={20} />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-semibold hover:border-indigo-500 transition-all"
              >
                <Download size={20} /> Download CV
              </motion.a>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <Github size={24} />, href: "https://github.com" },
                { icon: <Linkedin size={24} />, href: "https://linkedin.com" },
                { icon: <Mail size={24} />, href: "mailto:hello@example.com" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-square rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={32} className="text-indigo-600 dark:text-indigo-400" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="about" className="py-20 px-6 bg-white dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Technologies I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <SkillCard key={i} skill={skill} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              A showcase of my recent work and achievements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Have a project in mind? Let's create something amazing together!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-indigo-500 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus !== "idle"}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {formStatus === "idle" && (
                  <>
                    Send Message <Send size={20} />
                  </>
                )}
                {formStatus === "sending" && (
                  <>
                    Sending...
                  </>
                )}
                {formStatus === "sent" && (
                  <>
                    Message Sent! <CheckCircle2 size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Alex Morgan. Built with React & Motion</p>
        </div>
      </footer>
    </div>
  );
}
