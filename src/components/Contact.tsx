import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-content fade-in-on-scroll">
          <div className="contact-info">
            <p className="contact-description">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!
            </p>
            <div className="contact-methods">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <a href="mailto:linus.wong@example.com" className="contact-value">
                  linus.wong@example.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">LinkedIn:</span>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-value"
                >
                  Connect with me
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">GitHub:</span>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-value"
                >
                  Check out my code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

