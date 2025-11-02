import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <section className="hero">
        <h1 className="hero-title">Hi, I'm Linus Wong</h1>
        <p className="hero-bio">
        I'm an aspiring Software Engineer and an Electrical and Computer Engineering student at Santa Clara University.
        </p>
      </section>
      <nav className="quick-info">
        <a href="#resume" className="quick-link">Resume</a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="quick-link">GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="quick-link">LinkedIn</a>
        <a href="#contact" className="quick-link">Contact Me</a>
      </nav>
    </header>
  );
};

export default Header;

