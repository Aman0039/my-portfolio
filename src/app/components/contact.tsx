import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Mail,
  ExternalLink,
  Download,
  Code2,
  Cpu,
  Globe,
  Layers,
  Sun,
  Moon,
  Home,
  Menu,
  ChevronsUp,
  Github,
  Linkedin
} from "lucide-react";

// --- Mock Data ---
const SKILLS = [
  { name: "Javascript ES6", icon: <Code2 size={20} /> },
  { name: "Tailwind CSS", icon: <Layers size={20} /> },
  { name: "Node.js", icon: <Cpu size={20} /> },
  { name: "React", icon: <Globe size={20} /> }
];

const PROJECTS = [
  {
    title: "CrediSure",
    desc: "A Loan Application User interface using React.js",
    tech: ["React", "TailwindCSS", "Browser Router", "React Hook Form"],
    link: "https://github.com/yourusername/ecommerce-alpha",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=800&q=80"
  },
  {
    title: "NewTech",
    desc: "A Production level Simple Website for educational center kind of portfolio of a business.",
    tech: ["Framer Motion", "TypeScript", "React", "React Hook Form", "Node.js"],
    link: "https://github.com/yourusername/ai-dashboard",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?fit=crop&w=800&q=80"
  }
];

// --- Animation Variants ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// --- Typing Effect ---
const useTyping = (words: string[], speed = 120, pause = 1200) => {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === words.length) return;
    if (!deleting && subIndex === words[index].length) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) =>
        deleting ? prev - 1 : prev + 1
      );
      setDisplay(words[index].substring(0, subIndex));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);
  return display;
};

const navLinks = [
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" }
];

export function Contact() {
  const [dark, setDark] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const typing = useTyping([
    "Web Developer.",
    "React Specialist.",
    "Javascript ES6 Expert.",
    "Open Source Contributor."
  ]);

  // Scroll to top button
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  // Contact form (UI only)
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFormError("Please fill all fields.");
      return;
    }
    setFormError("");
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setForm({ name: "", email: "", message: "" });
  };

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className={`min-h-screen text-slate-900 selection:bg-indigo-100 ${dark ? "dark bg-slate-900 text-white" : ""}`}>
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-3 md:px-10 h-16 flex items-center justify-between">
          <span
            className="font-bold text-2xl tracking-tight text-indigo-600 dark:text-indigo-400 cursor-pointer flex items-center gap-2 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            tabIndex={0}
            onClick={() => scrollTo("hero")}
            onKeyPress={e => e.key === "Enter" && scrollTo("hero")}
          >
            <Home /> Aman Pathak
          </span>
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 font-semibold dark:text-white items-center">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400 px-2 py-1 rounded"
              >
                {link.label}
              </button>
            ))}
            <button
              aria-label="Toggle dark mode"
              className="ml-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          {/* Mobile Nav */}
          <button
            className="md:hidden p-2 rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Open navigation menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <Menu size={28} />
          </button>
        </div>
        {/* Mobile Drawer */}
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex flex-col gap-4"
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-lg font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                {link.label}
              </button>
            ))}
            <button
              aria-label="Toggle dark mode"
              className="mt-2 flex items-center gap-2"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{dark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </motion.div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-24 sm:space-y-32">
        {/* Hero Section */}
        <section id="hero" className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12 pt-6 md:pt-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="flex-1 space-y-6 w-full"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Aman <span className="text-indigo-600 dark:text-indigo-400">Pathak</span>
            </h1>
            <div className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed flex items-center gap-2">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{typing}</span>
              <span className="animate-pulse text-indigo-600 dark:text-indigo-400">|</span>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
              Building accessible, high-performance web applications using React and modern CSS architectures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/cv.pdf"
                download
                className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:bg-indigo-600 dark:hover:bg-indigo-500 focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="Download CV"
              >
                <Download size={18} /> Download CV
              </a>
              <div className="flex items-center gap-3 justify-center sm:justify-start mt-2 sm:mt-0 sm:ml-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Linkedin size={22} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex-1 flex justify-center w-full mb-8 md:mb-0"
          >
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl rotate-3 transition-transform duration-500 border-8 border-white dark:border-slate-800 mx-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="space-y-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Technical Arsenal</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="p-6 bg-white dark:bg-slate-800 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-400 hover:shadow-lg transition-all group focus-within:ring-2 focus-within:ring-indigo-400"
                tabIndex={0}
              >
                <div className="text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="space-y-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium cursor-pointer flex items-center gap-1 hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            >
              View All <ExternalLink size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-slate-900 rounded-3xl overflow-hidden aspect-video shadow-lg transition-transform focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label={project.title}
                tabIndex={0}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/40 to-transparent group-hover:from-indigo-600/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950/90 to-transparent">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/10 text-white rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-300 text-sm line-clamp-2">{project.desc}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={22} className="text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="pb-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="bg-gradient-to-br from-slate-900 to-indigo-900 dark:from-slate-800 dark:to-indigo-800 rounded-[2.5rem] p-6 sm:p-8 md:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white relative z-10"
            >
              Let's build something great.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-300 max-w-md mx-auto relative z-10"
            >
              Currently open to new opportunities and interesting side projects. My inbox is always open.
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 max-w-xl mx-auto relative z-10"
              onSubmit={handleForm}
              aria-label="Contact form"
              autoComplete="off"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <textarea
                placeholder="Your Message"
                required
                rows={4}
                className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full resize-none"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-500 transition-all font-semibold focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={sent}
              >
                <Mail size={20} /> {sent ? "Message Sent! ✓" : "Send Message"}
              </motion.button>
            </motion.form>
            
            {formError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 relative z-10"
              >
                {formError}
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10"
            >
              <motion.a
                href="mailto:hello@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl hover:bg-white/20 transition-all font-semibold focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400 border border-white/20"
                aria-label="Say Hello"
              >
                <Mail size={20} /> Say Hello
              </motion.a>
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition-all flex items-center gap-2 focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
                aria-label="View GitHub"
              >
                <Github size={20} /> View GitHub
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="py-8 border-t border-slate-200 dark:border-slate-700 text-center text-slate-400 text-sm">
        <p>
          © {new Date().getFullYear()} Designed &amp; Built by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Aman Pathak</span>
        </p>
      </footer>

      {/* Scroll to top */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500 transition-all focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-400"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ChevronsUp size={20} />
        </motion.button>
      )}
    </div>
  );
}
