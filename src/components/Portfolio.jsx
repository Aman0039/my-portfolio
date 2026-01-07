import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";
import {
  Mail,
  ExternalLink,
  Sparkles,
  Code2,
  Palette,
  Rocket,
  Send,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  ChevronsUp,
  Moon,
  Sun,
  Download,
  Hexagon,
  Atom,
} from "lucide-react";

// SimpleIcons SVGs for Github and Linkedin
const GithubIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.3-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.628-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.369-1.849 3.602 0 4.268 2.368 4.268 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.069 0-1.143.925-2.069 2.069-2.069 1.143 0 2.069.926 2.069 2.069 0 1.143-.926 2.069-2.069 2.069zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 24 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0z" />
  </svg>
);

// Simple image fallback
function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error ? "https://via.placeholder.com/400x400?text=Image" : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

// Floating Particles Background
function FloatingParticles() {
  // prevent usage during SSR/build
  if (typeof window === "undefined") return null;

  const particles = useMemo(
    () =>
      Array.from({ length: 35 }).map(() => ({
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        animateX: Math.random() * window.innerWidth,
        animateY: Math.random() * window.innerHeight,
        duration: Math.random() * 30 + 10,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
          initial={{
            x: p.initialX,
            y: p.initialY,
          }}
          animate={{
            x: p.animateX,
            y: p.animateY,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

// Skill Card Component
function SkillCard({ skill, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
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
            className="h-2 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full"
          />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">{skill.level}%</p>
      </div>
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-96"
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
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
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
                <GithubIcon width={16} height={16} /> Code
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggle } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");

  //Form data
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Handle Submit form
  const onSubmit = async (data) => {
    setFormStatus("sending");

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: "Portfolio Contact Message",
      message: data.message,
      to_name: "Aman Pathak",
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormStatus("sent");
      reset();

      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setFormStatus("idle");
      alert("Failed to send message. Please try again.");
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    { name: "JavaScript", icon: <Code2 size={24} />, level: 90 },
    { name: "React.js", icon: <Atom size={24} />, level: 85 },
    { name: "Node.js", icon: <Hexagon size={24} />, level: 70 },
    { name: "Tailwind CSS", icon: <Sparkles size={24} />, level: 85 },
    { name: "Motion & Animation", icon: <Rocket size={24} />, level: 65 },
  ];

  const projects = [
    {
      title: "Loan Application",
      description:
        "A modern, full-stack loan application with multi-step form, Apply loan, and track application status on the dashboard.",
      image: "/image/project1.jpg",
      tags: ["React", "JSX", "Tailwind CSS", "Node.js"],
      link: "https://loan-application-oxp8.vercel.app/",
      github: "https://github.com/Aman0039/Loan-Application/tree/main/Loan-Application",
    },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-300">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
          style={{ scaleX }}
        />

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-xl cursor-pointer font-bold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
                onClick={() => scrollToSection("contact")}
              >
                @aman.web
              </motion.h1>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-15">
                {["About", "Skills", "Projects", "Contact"].map((item) => (
                  <motion.button
                    key={item}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="font-stretch-expanded text-xl hover:text-indigo-700 cursor-pointer dark:hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
              {/* Right side icons */}
              <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggle}
                  className="p-2 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Toggle dark mode"
                  aria-pressed={darkMode}
                  title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? (
                    <Sun size={24} className="text-yellow-500" />
                  ) : (
                    <Moon size={24} className="text-slate-700" />
                  )}
                </motion.button>
                {/* Mobile Menu Button */}
                <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
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
                    className="block w-full text-left font-medium cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.nav>

        {/* Hero Section */}
        <section id="hero" className="py-24 md:py-32 px-6 flex items-center justify-center relative mt-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Available for work</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Hello, I'm{" "}
                <span className="bg-linear-to-r from-rose-400 md:from-rose-500 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                  Aman Pathak
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Aspiring <strong>MERN Stack Web Developer</strong> with strong foundations in <strong>React.js</strong> and <strong>JavaScript</strong>, focused on building fast, scalable, and user-centric web applications.
              </p>

              <div className="flex gap-4 mb-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/Aman_Pathak_CV.pdf"
                  download="Aman_Pathak_CV"
                  className="flex items-center gap-2 px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Download CV <Download size={19} />
                </motion.a>
              </div>
              <div className="flex gap-5">
                {[
                  { icon: <GithubIcon width={28} height={28} />, href: "https://github.com/Aman0039" },
                  { icon: <LinkedinIcon width={28} height={28} />, href: "https://www.linkedin.com/in/aman-pathak01/" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                    aria-label={`Open ${i === 0 ? "GitHub" : "LinkedIn"}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, delay: 0.4 }} className="relative flex justify-center">
              <div className="absolute inset-0 bg-linear-to-r from-indigo-900 to-purple-900 rounded-full blur-3xl opacity-20 animate-pulse" />
              <motion.div className="relative w-full max-w-xs md:max-w-sm aspect-square rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
                <ImageWithFallback src="/image/Aman.jpg" alt="Profile" className="w-full h-full object-cover object-center" />
              </motion.div>
            </motion.div>
          </div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <ChevronDown size={32} className="text-indigo-600 dark:text-indigo-400" />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-white dark:bg-slate-800/50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                About <span className="bg-linear-to-tr from-indigo-600 to-rose-500 bg-clip-text text-transparent">Me</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Get to know me better and discover my journey</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  I'm a passionate full-stack JavaScript developer with a deep love for creating beautiful and functional web applications. With expertise in the MERN stack, I specialize in building scalable solutions that solve real-world problems.
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  My journey in web development started with a curiosity about how things work on the internet. Since then, I've honed my skills through various projects and continuous learning. I believe in writing clean, maintainable code and creating exceptional user experiences.
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm always eager to take on new challenges and collaborate with talented individuals.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-600 rounded-lg text-white mt-1">
                      <Code2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Development</h3>
                      <p className="text-slate-600 dark:text-slate-400">Full-stack development using modern JavaScript frameworks and tools</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg text-white mt-1">
                      <Palette size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Design</h3>
                      <p className="text-slate-600 dark:text-slate-400">Creating intuitive and visually appealing user interfaces</p>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-2xl border border-pink-200 dark:border-pink-800">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-pink-600 rounded-lg text-white mt-1">
                      <Rocket size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Innovation</h3>
                      <p className="text-slate-600 dark:text-slate-400">Bringing creative ideas to life with cutting-edge technology</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Skills & <span className="bg-linear-to-tr from-indigo-600 to-rose-500 bg-clip-text text-transparent">Expertise</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Technologies I work with to bring ideas to life</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, i) => (
                <SkillCard key={i} skill={skill} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="bg-linear-to-tr from-indigo-600 to-rose-500 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">A showcase of my recent work and achievements</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Stats Section */}
        <section className="py-20 px-6 bg-white dark:bg-slate-800/50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                GitHub <span className="bg-linear-to-tr from-indigo-600 to-rose-500 bg-clip-text text-transparent">Activity</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">My coding journey visualized through contributions</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-indigo-600">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  src="https://ghchart.rshah.org/Aman0039"
                  alt="GitHub Contributions Chart - Hover to view details"
                  className="w-full min-w-max cursor-pointer transition-transform duration-300"
                  title="GitHub contribution graph showing daily activity"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-8">
              <motion.a
                href="https://github.com/Aman0039"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all shadow-lg hover:shadow-xl"
              >
                <GithubIcon width={20} height={20} />
                View Full GitHub Profile
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* LeetCode Stats Section */}
        <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/30 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                LeetCode <span className="bg-linear-to-tr from-indigo-600 to-rose-500 bg-clip-text text-transparent">Stats</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Problem-solving skills and coding progress</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative group flex justify-center">
              <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-purple-400 dark:group-hover:border-purple-600 max-w-2xl w-full">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  src="https://leetcard.jacoblin.cool/Amanpathak1"
                  alt="LeetCode Stats Card"
                  className="w-full cursor-pointer transition-transform duration-300 rounded-lg"
                  title="LeetCode statistics and problem-solving progress"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-8">
              <motion.a
                href="https://leetcode.com/u/Amanpathak1/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-indigo-500 hover:text-white text-slate-800 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Code2 size={20} />
                View LeetCode Profile
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                <Mail size={16} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Get in Touch</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Let's <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Feel free to reach out for collaborations or just a friendly hello.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all placeholder-slate-400"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </motion.div>

                    {/* Email */}
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="relative">
                      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Email Address</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all placeholder-slate-400"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="relative">
                    <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Your Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all resize-none placeholder-slate-400"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                  </motion.div>

                  {/* Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || formStatus === "sending"}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center cursor-pointer justify-center gap-2 px-8 py-4 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {formStatus === "idle" && (
                      <>
                        Send Message <Send size={20} />
                      </>
                    )}
                    {formStatus === "sending" && (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        Sending...
                      </>
                    )}
                    {formStatus === "sent" && (
                      <>
                        Message Sent! <CheckCircle2 size={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-700 bg-linear-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Social Links */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-center">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Connect</h4>
                <div className="flex justify-center gap-4">
                  {[
                    { icon: <GithubIcon width={20} height={20} />, href: "https://github.com/Aman0039", label: "GitHub" },
                    { icon: <LinkedinIcon width={20} height={20} />, href: "https://www.linkedin.com/in/aman-pathak01/", label: "LinkedIn" },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ scale: 1.2, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all cursor-pointer"
                      title={social.label}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center md:text-right">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Contact</h4>
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    <a href="mailto:pathakaman053@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      pathakaman053@gmail.com
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-px bg-linear-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-6 origin-left" />

            {/* Copyright & Credits */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-center space-y-2">
              <p className="text-slate-600 dark:text-slate-400 text-sm">Copyright © {new Date().getFullYear()} Aman Pathak. All rights reserved.</p>
              <p className="text-slate-500 dark:text-slate-500 text-xs">Built it using React, Motion & Tailwind CSS</p>
            </motion.div>
          </div>
        </footer>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed right-6 cursor-pointer bottom-6 z-50 p-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg hover:bg-purple-600 dark:hover:bg-purple-500 transition-all hover:scale-110"
          aria-label="Scroll to top"
          disabled={!showScrollTop}
          style={{ pointerEvents: showScrollTop ? "auto" : "none" }}
        >
          <ChevronsUp size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default Portfolio;
