import { useState, useEffect, useRef } from 'react';
import './Experience.css';
import racecarImage from '../assets/racecar.png';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  projectLink?: string;
  tags?: string[];
}

const Experience = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [characterPosition, setCharacterPosition] = useState({ top: 0, left: 0 });
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Generate windy road path that matches the character's zigzag movement
  const generateWindyPath = (): string => {
    const steps = 80;
    const pathPoints: string[] = [];
    const maxOffset = 30; // Same as character zigzag offset (30%)
    
    // Start from center
    pathPoints.push(`50 0`);
    
    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      const y = progress * 100; // 0 to 100% down
      // Same sine function as character uses: Math.sin(progress * Math.PI * 4) * 30
      const xOffset = Math.sin(progress * Math.PI * 4) * maxOffset;
      const x = 50 + xOffset; // Center (50) with offset
      pathPoints.push(`${x} ${y}`);
    }
    
    // Create smooth path using quadratic bezier curves
    let path = '';
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const [x, y] = pathPoints[i].split(' ').map(Number);
      const [nextX, nextY] = pathPoints[i + 1].split(' ').map(Number);
      
      if (i === 0) {
        path += `L ${x} ${y} `;
      }
      
      // Use quadratic bezier for smooth curves
      const controlX = (x + nextX) / 2;
      const controlY = (y + nextY) / 2;
      path += `Q ${controlX} ${controlY} ${nextX} ${nextY} `;
    }
    
    return path.trim();
  };

  const experiences: ExperienceItem[] = [
    {
      title: 'Software Engineer Intern',
      company: 'Tech Company',
      period: '2024 - Present',
      description: [
        'Developed and maintained web applications using React and TypeScript',
        'Collaborated with cross-functional teams to deliver high-quality software solutions',
        'Implemented responsive designs and optimized application performance'
      ],
      projectLink: '#projects',
      tags: ['Full Stack', 'React', 'TypeScript']
    },
    {
      title: 'Junior Developer',
      company: 'Startup Inc',
      period: '2023 - 2024',
      description: [
        'Built frontend components using modern JavaScript frameworks',
        'Participated in code reviews and agile development processes',
        'Contributed to improving codebase quality and documentation'
      ],
      projectLink: '#projects',
      tags: ['Frontend', 'JavaScript']
    },
    {
      title: 'Student Researcher',
      company: 'Santa Clara University',
      period: '2022 - 2023',
      description: [
        'Conducted research in machine learning and computer vision',
        'Published findings in academic journals',
        'Presented research at university conferences'
      ],
      projectLink: '#projects',
      tags: ['ML/AI', 'Research']
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self Employed',
      period: '2021 - 2022',
      description: [
        'Created custom websites for small businesses',
        'Managed client relationships and project timelines',
        'Learned various web technologies through hands-on projects'
      ],
      tags: ['Web Development']
    }
  ];

  // Intersection Observer for experience items - once visible, stay visible
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleItems((prev) => {
            // Only add if not already visible (Set handles uniqueness)
            if (prev.has(index)) {
              observer.unobserve(entry.target);
              return prev;
            }
            // Stop observing once visible to optimize performance
            observer.unobserve(entry.target);
            return new Set([...prev, index]);
          });
        }
      });
    }, observerOptions);

    // Capture current refs value to use in cleanup
    const currentItemRefs = itemRefs.current;

    // Observe all items that are mounted
    currentItemRefs.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      currentItemRefs.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, [experiences.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !characterRef.current) return;

      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top + window.scrollY;
      const timelineHeight = timeline.offsetHeight;
      const scrollY = window.scrollY + window.innerHeight / 2;
      
      // Calculate progress through timeline (0 to 1)
      const progress = Math.max(0, Math.min(1, (scrollY - timelineTop) / timelineHeight));
      
      // Position character along timeline (zigzag pattern)
      const zigzagOffset = Math.sin(progress * Math.PI * 4) * 30; // Zigzag movement
      const characterTop = progress * timelineHeight;
      const characterLeft = 50 + zigzagOffset; // Center with zigzag
      
      setCharacterPosition({ 
        top: characterTop, 
        left: characterLeft 
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline-wrapper" ref={timelineRef}>
          {/* Windy Road Track - SVG path following zigzag pattern */}
          <svg className="windy-road-track" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              className="road-path"
              d={`M 50 0 ${generateWindyPath()}`}
              fill="none"
              stroke="#FFD700"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div 
            className="timeline-character" 
            ref={characterRef}
            style={{
              top: `${characterPosition.top}px`,
              left: `${characterPosition.left}%`,
              opacity: 1
            }}
          >
            <div className="character-emoji" style={{ fontSize: '140px' }}>
              <img 
                src={racecarImage} 
                alt="Race car" 
                style={{ 
                  width: '140px',
                  height: '140px',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
          <div className="timeline-line"></div>
          <div className="experience-timeline fade-in-on-scroll">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className={`experience-item ${hoveredItem === index ? 'hovered' : ''} ${visibleItems.has(index) ? 'visible' : ''}`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="timeline-marker"></div>
                <div className="experience-content">
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
                  {exp.projectLink && (
                    <a href={exp.projectLink} className="project-link">
                      View Related Projects →
                    </a>
                  )}
                  {exp.tags && (
                    <div className="experience-tags">
                      {exp.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

