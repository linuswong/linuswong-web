import './Skills.css';

interface SkillCategory {
  category: string;
  skills: string[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      category: 'Frontend',
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Vue.js']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Python', 'Java', 'Express.js', 'REST APIs', 'GraphQL']
    },
    {
      category: 'Tools & Technologies',
      skills: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Linux']
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid fade-in-on-scroll">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3>{category.category}</h3>
              <div className="skill-badges">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-badge">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

