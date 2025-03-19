import React from 'react';
import './Styles/Home.css';

function Home() {
  // Number of floating logos and squares
  const numberOfLogos = 7; // Reduced number of logos
  const numberOfSquares = 11; // Reduced number of squares

  // Generate an array of random positions for the logos
  const floatingLogos = Array.from({ length: numberOfLogos }, (_, index) => {
    const top = `${Math.random() * 100}%`; // Random top position
    const left = `${Math.random() * 100}%`; // Random left position
    return (
      <div
        key={`logo-${index}`}
        className="floating-object logo"
        style={{ top, left }}
      >
        <img src="/SafeWebLOGO.png" alt="Safe Web Logo" />
      </div>
    );
  });

  // Generate an array of random positions for the squares
  const floatingSquares = Array.from({ length: numberOfSquares }, (_, index) => {
    const top = `${Math.random() * 100}%`; // Random top position
    const left = `${Math.random() * 100}%`; // Random left position
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.4)`; // Random color
    return (
      <div
        key={`square-${index}`}
        className="floating-object square"
        style={{ top, left, backgroundColor: randomColor }}
      ></div>
    );
  });

  return (
    <div>
      {/* Floating Objects */}
      <div className="floating-objects">
        {floatingLogos}
        {floatingSquares}
      </div>

      {/* Rest of your content */}
      <div className="home-container">
        <h1>Combat Online Harassment with SafeWeb
          
        </h1>
        <p>
          Safe Web is your shield against online abuse, providing powerful tools to report harassment and create a more respectful digital environment.
        </p>
        <div className="buttons">
          <button className="primary">Get the Extension</button>
          <button className="secondary">Learn More</button>
        </div>
      </div>

      {/* Other sections */}
      <div className="stories-container">
        <h1>Real Stories, Real Impact</h1>
        <p>
          Join thousands of users who are making the internet a safer place. Every report contributes to positive change.
        </p>
        <div className="features">
          <div className="feature-card">
            <img src="/anonymity.webp" alt="Anonymity & Security" className="feature-image" />
            <h3>Anonymity & Security</h3>
            <p>Your identity is protected while reporting. We use advanced encryption to ensure your data is secure.</p>
          </div>
          <div className="feature-card">
            <img src="/report.jpg" alt="Seamless Reporting" className="feature-image" />
            <h3>Seamless Reporting</h3>
            <p>Our intuitive interface makes reporting harassment quick and easy. No technical skills required.</p>
          </div>
          <div className="feature-card">
            <img src="/community.jpg" alt="Community Support" className="feature-image" />
            <h3>Community Support</h3>
            <p>Join a global community of users dedicated to creating a safer online environment.</p>
          </div>
        </div>
      </div>

      <div className="steps-container">
        <h1>Using Safe Web is Simple & Effective</h1>
        <p>
          Take action against online harassment in three easy steps.
        </p>
        <div className="steps">
          <div className="step">
            <span role="img" aria-label="Download" className="step-icon">⬇️</span> {/* Icon for Install */}
            <h3>Install</h3>
            <p>Add Safe Web to your browser with a single click. It's lightweight and easy to use.</p>
          </div>
          <div className="step">
            <span role="img" aria-label="Flag" className="step-icon">🚩</span> {/* Icon for Report */}
            <h3>Report</h3>
            <p>Capture and report online harassment effortlessly. Our AI-powered tools make it simple.</p>
          </div>
          <div className="step">
            <span role="img" aria-label="Chart" className="step-icon">📈</span> {/* Icon for Track Progress */}
            <h3>Track Progress</h3>
            <p>Monitor the status of your reports and see the impact of your contributions.</p>
          </div>
        </div>
      </div>

      <div className="why-choose-container">
        <h1>Why Choose Safe Web?</h1>
        <p>
          Safe Web is trusted by millions of users worldwide. Here's why:
        </p>
        <div className="reasons">
          <div className="reason-card">
            <h3>Advanced AI</h3>
            <p>Our AI detects and flags harassment with 95% accuracy.</p>
          </div>
          <div className="reason-card">
            <h3>24/7 Support</h3>
            <p>Our support team is available around the clock to assist you.</p>
          </div>
          <div className="reason-card">
            <h3>Global Community</h3>
            <p>Join a network of users fighting for a safer internet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;