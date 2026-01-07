import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  return (
    <section id="about" className="py-20 px-6 bg-accent/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1666723043169-22e29545675c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2NjA4MTY1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Workspace"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="mb-4">Creative Developer with a Passion for Innovation</h3>
            <p className="text-muted-foreground mb-4">
              With over 5 years of experience in web development, I specialize in creating
              responsive, accessible, and performant web applications. My journey began with
              a curiosity for how things work on the web and has evolved into a career
              dedicated to building exceptional digital experiences.
            </p>
            <p className="text-muted-foreground mb-4">
              I believe in writing clean, maintainable code and staying up-to-date with the
              latest technologies and best practices. When I'm not coding, you can find me
              contributing to open-source projects, writing technical blogs, or exploring new
              design trends.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <div className="text-3xl text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div>
                <div className="text-3xl text-primary mb-2">5+</div>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <div className="text-3xl text-primary mb-2">30+</div>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
              <div>
                <div className="text-3xl text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Dedication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
