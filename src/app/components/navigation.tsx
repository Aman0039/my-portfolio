import { useState, useEffect } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-semibold hover:text-primary transition-colors"
          >
            Portfolio
          </button>
          <div className="flex gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="hover:text-primary transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
