import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-5xl">
            JD
          </div>
          <h1 className="mb-4">
            Hi, I'm <span className="text-primary">John Doe</span>
          </h1>
          <h2 className="text-muted-foreground mb-6">
            Full Stack Developer & Designer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            I craft beautiful, functional web experiences with a focus on user-centered design
            and modern technologies. Passionate about turning ideas into reality.
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <Button onClick={() => scrollToSection("projects")}>
            View My Work
          </Button>
          <Button variant="outline" onClick={() => scrollToSection("contact")}>
            Get In Touch
          </Button>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:john@example.com"
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
