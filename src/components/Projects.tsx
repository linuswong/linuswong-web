import './Projects.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'Project One',
      description: 'A full-stack web application built with modern technologies, featuring real-time updates and a responsive design.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Project Two',
      description: 'An innovative mobile-responsive application with advanced data visualization and user analytics.',
      technologies: ['React', 'Python', 'PostgreSQL', 'D3.js'],
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Project Three',
      description: 'A cloud-based platform with microservices architecture, implementing best practices for scalability and performance.',
      technologies: ['Vue.js', 'Go', 'Docker', 'AWS'],
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid fade-in-on-scroll">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

