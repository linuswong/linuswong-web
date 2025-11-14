import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-navigation">
          <div className="footer-section footer-about">
            <h2 className="footer-name">Linus Wong</h2>
            <p className="footer-bio">
              Passionate software developer and engineer focused on creating innovative solutions 
              and driving technical excellence through clean code and best practices.
            </p>
            <button className="back-to-top" onClick={scrollToTop}>
              <span>↑</span> BACK TO TOP
            </button>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Navigation</h3>
            <div className="footer-links">
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#certifications" className="footer-link">Certs</a>
              <a href="#technologies" className="footer-link">Tech</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="footer-link">Resume</a>
              <a href="#contact" className="footer-link">Contact Me</a>
              <a href="https://www.linkedin.com/in/linus-e-wong/" target="_blank" rel="noopener noreferrer" className="footer-link">
                LinkedIn
              </a>
              <a href="https://github.com/linuswong" target="_blank" rel="noopener noreferrer" className="footer-link">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Linus Wong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

