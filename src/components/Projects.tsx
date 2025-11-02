import { useState, useMemo } from 'react';
import './Projects.css';
import projectsData from '../data/projects.json';

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

  const projects: Project[] = useMemo(() => projectsData.projects as Project[], []);

  // Technology similarity mapping for related technologies
  const technologyRelations: Record<string, string[]> = projectsData.technologyRelations as Record<string, string[]>;

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    // Start with all projects - always create a new array reference
    let filtered = projects.slice();

    // Filter by category first
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search query only if there's a non-empty query
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      const query = trimmedQuery.toLowerCase();
      filtered = filtered.filter(project => {
        const techMatch = project.technologies.some(tech => 
          tech.toLowerCase().includes(query)
        );
        const titleMatch = project.title.toLowerCase().includes(query);
        const descMatch = project.description.toLowerCase().includes(query);
        return techMatch || titleMatch || descMatch;
      });
    }
    // If searchQuery is empty, return all projects (filtered by category only)

    return filtered;
  }, [searchQuery, selectedCategory, projects]);

  const top3Projects = useMemo(() => 
    projects.filter(p => p.isTop3).sort((a, b) => (a.rank || 0) - (b.rank || 0)),
    [projects]
  );
  
  // Don't memoize miscProjects - compute it directly from filteredProjects
  // This ensures it always recalculates when filteredProjects changes
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

  // Only show no results if search query exists AND no projects match at all (including top3)
  const showNoResults = searchQuery.trim().length > 0 && filteredProjects.length === 0;
  const relatedTechs = showNoResults ? getRelatedTechnologies(searchQuery) : [];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        {/* Top 3 Podium */}
        <div className="podium-section">
          <h3 className="podium-title">Top 3 Personal Favorites</h3>
          <div className="podium-container fade-in-on-scroll">
            {top3Projects.map((project) => {
              // Order: 1st place in middle, 2nd on left, 3rd on right
              const order = project.rank === 1 ? 2 : project.rank === 2 ? 1 : 3;
              
              return (
                <div key={project.title} className={`podium-item rank-${project.rank}`} style={{ order }}>
                  <div className="podium-stand">
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

        {/* Misc Projects - Always show when there are misc projects */}
        {miscProjects && miscProjects.length > 0 && (
          <div className="misc-projects-section" key={`misc-${searchQuery}-${miscProjects.length}`}>
            <h3 className="misc-title">Other Projects</h3>
            <div className="projects-grid">
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

