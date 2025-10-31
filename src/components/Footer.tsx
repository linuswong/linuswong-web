import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-navigation">
          <div className="footer-section">
            <h3 className="footer-title">Navigation</h3>
            <div className="footer-links">
              <a href="#resume" className="footer-link">Resume</a>
              <a href="#contact" className="footer-link">Contact Me</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                GitHub
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#certifications" className="footer-link">Certs</a>
              <a href="#technologies" className="footer-link">Tech</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Linus Wong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

