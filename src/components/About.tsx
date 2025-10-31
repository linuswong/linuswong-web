import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content fade-in-on-scroll">
          <div className="about-text">
            <p className="intro-text">
              Hi, I'm a passionate software engineer with a love for creating innovative solutions
              and building exceptional user experiences.
            </p>
            <p>
              I specialize in developing scalable applications using modern technologies and best practices.
              My approach combines technical expertise with creative problem-solving to deliver high-quality
              software that makes a difference.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or continuously learning to stay at the forefront of software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

