import { useMemo, useState, type ReactNode, type CSSProperties } from 'react';
import { 
  FaReact, FaNode, FaPython, FaJava, FaJs, FaGitAlt, FaDocker
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiAmazonwebservices, SiTensorflow,
  SiKeras, SiPytorch, SiDjango, SiFlask, SiExpress, SiNextdotjs,
  SiVuedotjs, SiAngular, SiFirebase, SiRedis, SiKubernetes,
  SiGraphql, SiElasticsearch, SiNginx, SiJenkins
} from 'react-icons/si';
import './Technologies.css';

interface Technology {
  name: string;
  icon: ReactNode;
  color: string;
}

const TECHNOLOGIES: Technology[] = [
    { name: 'React', icon: <FaReact />, color: '#61DAFB' },
    { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
    { name: 'Node.js', icon: <FaNode />, color: '#339933' },
    { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { name: 'Java', icon: <FaJava />, color: '#ED8B00' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#316192' },
    { name: 'AWS', icon: <SiAmazonwebservices />, color: '#232F3E' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
    { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
    { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C' },
    { name: 'Keras', icon: <SiKeras />, color: '#D00000' },
    { name: 'Django', icon: <SiDjango />, color: '#092E20' },
    { name: 'Flask', icon: <SiFlask />, color: '#000000' },
    { name: 'Express', icon: <SiExpress />, color: '#000000' },
    { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
    { name: 'Vue.js', icon: <SiVuedotjs />, color: '#4FC08D' },
    { name: 'Angular', icon: <SiAngular />, color: '#DD0031' },
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
    { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
    { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326CE5' },
    { name: 'GraphQL', icon: <SiGraphql />, color: '#E10098' },
    { name: 'Elasticsearch', icon: <SiElasticsearch />, color: '#005571' },
    { name: 'Nginx', icon: <SiNginx />, color: '#009639' },
    { name: 'Jenkins', icon: <SiJenkins />, color: '#D24939' }
];

const Technologies = () => {
  const [isPaused, setIsPaused] = useState(false);

  const marqueeTechnologies = useMemo(
    () => [...TECHNOLOGIES, ...TECHNOLOGIES],
    []
  );

  return (
    <section id="technologies" className="technologies-section">
      <div className="container">
        <h2 className="section-title">Technologies</h2>
        <div 
          className="technologies-carousel fade-in-on-scroll"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`carousel-track${isPaused ? ' is-paused' : ''}`}
          >
            {marqueeTechnologies.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="tech-icon-wrapper"
                style={{
                  '--tech-color': tech.color
                } as CSSProperties}
              >
                <div className="tech-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;

