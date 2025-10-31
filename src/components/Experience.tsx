import './Experience.css';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'Software Engineer',
      company: 'Tech Company',
      period: '2023 - Present',
      description: [
        'Developed and maintained web applications using React and TypeScript',
        'Collaborated with cross-functional teams to deliver high-quality software solutions',
        'Implemented responsive designs and optimized application performance'
      ]
    },
    {
      title: 'Junior Developer',
      company: 'Startup Inc',
      period: '2022 - 2023',
      description: [
        'Built frontend components using modern JavaScript frameworks',
        'Participated in code reviews and agile development processes',
        'Contributed to improving codebase quality and documentation'
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline fade-in-on-scroll">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{exp.title}</h3>
                <span className="company">{exp.company}</span>
                <span className="period">{exp.period}</span>
              </div>
              <ul className="experience-description">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

