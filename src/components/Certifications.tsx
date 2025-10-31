import './Certifications.css';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

const Certifications = () => {
  const certifications: Certification[] = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024',
      credentialId: 'ABC-123-XYZ',
      link: 'https://aws.amazon.com'
    },
    {
      title: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2023',
      link: 'https://www.tensorflow.org'
    },
    {
      title: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: '2023',
      credentialId: 'MS-AZ-900',
      link: 'https://azure.microsoft.com'
    }
  ];

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid fade-in-on-scroll">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-card">
              <div className="certification-header">
                <h3>{cert.title}</h3>
                <span className="cert-date">{cert.date}</span>
              </div>
              <p className="cert-issuer">{cert.issuer}</p>
              {cert.credentialId && (
                <p className="cert-id">Credential ID: {cert.credentialId}</p>
              )}
              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cert-link"
                >
                  View Credential →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

