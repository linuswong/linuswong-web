import { useState, useMemo } from 'react';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'ML/AI' | 'SWE';
  github?: string;
  demo?: string;
  image?: string;
  isTop3?: boolean;
  rank?: 1 | 2 | 3;
}

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ML/AI' | 'SWE' | 'All'>('All');

  const projects: Project[] = [
    {
      title: 'AI Image Classifier',
      description: 'Deep learning model for image classification using convolutional neural networks. Achieved 95% accuracy on CIFAR-10 dataset with transfer learning techniques.',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy'],
      category: 'ML/AI',
      github: 'https://github.com',
      demo: 'https://demo.com',
      isTop3: true,
      rank: 1
    },
    {
      title: 'Full Stack E-Commerce Platform',
      description: 'Complete e-commerce solution with user authentication, payment processing, and admin dashboard. Built with modern web technologies and deployed on cloud infrastructure.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'AWS'],
      category: 'SWE',
      github: 'https://github.com',
      demo: 'https://demo.com',
      isTop3: true,
      rank: 2
    },
    {
      title: 'Predictive Analytics Dashboard',
      description: 'Real-time data visualization dashboard with machine learning predictions. Features interactive charts, live data streaming, and customizable widgets.',
      technologies: ['Python', 'React', 'D3.js', 'Flask', 'PostgreSQL', 'Docker'],
      category: 'ML/AI',
      github: 'https://github.com',
      demo: 'https://demo.com',
      isTop3: true,
      rank: 3
    },
    {
      title: 'Portfolio Website',
      description: 'Responsive personal portfolio website with modern design and smooth animations. Built with React and TypeScript.',
      technologies: ['React', 'TypeScript', 'CSS3', 'Vite'],
      category: 'SWE',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'NLP Sentiment Analyzer',
      description: 'Natural language processing application that analyzes sentiment in text data. Uses transformer models for high accuracy.',
      technologies: ['Python', 'Transformers', 'NLTK', 'Streamlit'],
      category: 'ML/AI',
      github: 'https://github.com'
    },
    {
      title: 'Task Management API',
      description: 'RESTful API for task management with user roles, authentication, and real-time updates. Includes comprehensive documentation.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
      category: 'SWE',
      github: 'https://github.com'
    },
    {
      title: 'Computer Vision Project',
      description: 'Object detection system using YOLO architecture. Can detect and classify multiple objects in real-time video streams.',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'YOLO', 'CUDA'],
      category: 'ML/AI',
      github: 'https://github.com'
    },
    {
      title: 'Cloud Storage App',
      description: 'File storage application with drag-and-drop interface. Features encryption, sharing capabilities, and version control.',
      technologies: ['React', 'TypeScript', 'Firebase', 'TailwindCSS', 'AWS S3'],
      category: 'SWE',
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  ];

  // Technology similarity mapping for related technologies
  const technologyRelations: Record<string, string[]> = {
    'Python': ['Java', 'JavaScript', 'C++', 'R'],
    'React': ['Vue', 'Angular', 'Svelte'],
    'Node.js': ['Deno', 'Bun', 'Express'],
    'MongoDB': ['PostgreSQL', 'MySQL', 'Firebase'],
    'TensorFlow': ['PyTorch', 'Keras', 'Scikit-learn'],
    'TypeScript': ['JavaScript', 'Flow', 'Dart']
  };

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet);
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(project => {
        const techMatch = project.technologies.some(tech => 
          tech.toLowerCase().includes(query)
        );
        const titleMatch = project.title.toLowerCase().includes(query);
        const descMatch = project.description.toLowerCase().includes(query);
        return techMatch || titleMatch || descMatch;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, projects]);

  const top3Projects = projects.filter(p => p.isTop3).sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const miscProjects = filteredProjects.filter(p => !p.isTop3);

  const getRelatedTechnologies = (query: string): string[] => {
    const normalizedQuery = query.toLowerCase();
    const related: string[] = [];
    
    for (const [tech, relations] of Object.entries(technologyRelations)) {
      if (tech.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(tech.toLowerCase())) {
        related.push(...relations.filter(r => allTechnologies.includes(r)));
      }
    }
    
    return Array.from(new Set(related)).slice(0, 5);
  };

  const showNoResults = searchQuery.trim() && filteredProjects.length === 0;
  const relatedTechs = showNoResults ? getRelatedTechnologies(searchQuery) : [];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        {/* Search and Filter */}
        <div className="projects-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'ML/AI' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ML/AI')}
            >
              ML/AI
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'SWE' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('SWE')}
            >
              SWE
            </button>
          </div>
        </div>

        {/* No Results Message */}
        {showNoResults && (
          <div className="no-results">
            <p className="no-results-message">
              I haven't used that technology but I'm always willing to learn!
            </p>
            {relatedTechs.length > 0 && (
              <div className="related-technologies">
                <p>Related technologies I've worked with:</p>
                <div className="related-tech-tags">
                  {relatedTechs.map((tech, index) => (
                    <span key={index} className="related-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Top 3 Podium */}
        <div className="podium-section">
          <h3 className="podium-title">Top 3 Personal Favorites</h3>
          <div className="podium-container fade-in-on-scroll">
            {top3Projects.map((project) => {
              const podiumHeight = project.rank === 1 ? '100%' : project.rank === 2 ? '80%' : '60%';
              const order = project.rank === 1 ? 2 : project.rank === 2 ? 1 : 3;
              
              return (
                <div key={project.title} className={`podium-item rank-${project.rank}`} style={{ order }}>
                  <div className="podium-stand" style={{ height: podiumHeight }}>
                    <div className="podium-number">{project.rank}</div>
                  </div>
                  <div className="podium-project">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="project-technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-badge">{tech}</span>
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
                          Demo
                        </a>
                      )}
                    </div>
                    <span className={`category-badge category-${project.category.toLowerCase().replace('/', '-')}`}>
                      {project.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Misc Projects */}
        {miscProjects.length > 0 && (
          <div className="misc-projects-section">
            <h3 className="misc-title">Other Projects</h3>
            <div className="projects-grid fade-in-on-scroll">
              {miscProjects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className={`category-badge category-${project.category.toLowerCase().replace('/', '-')}`}>
                      {project.category}
                    </span>
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
        )}
      </div>
    </section>
  );
};

export default Projects;

