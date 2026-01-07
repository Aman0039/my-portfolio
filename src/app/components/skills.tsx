import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code, Briefcase } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Backend Development",
    icon: Code,
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    title: "Tools & Others",
    icon: Briefcase,
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS / Vercel", level: 75 },
      { name: "Figma", level: 85 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-accent/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-4">Skills & Expertise</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and proficiency levels.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
