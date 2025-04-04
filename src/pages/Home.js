import React from 'react';
import './Styles/Home.css';
import heroBackground from '../assets/background.jpg'; // Make sure to add this image file

function Home() {
  return (
    <div className="home-page">
      {/* Full-width Hero Section with Background */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Combat Online Harassment with <span className="highlight">SafeWeb</span></h1>
            <p className="subtitle">
              Your digital shield against online abuse. Report harassment safely and help create a more respectful internet.
            </p>
            <div className="cta-buttons">
              <button className="primary-button">
                Get the Extension <span className="icon">→</span>
              </button>
              <button className="secondary-button">
                Learn More <span className="icon">→</span>
              </button>
            </div>
          </div>

          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <div className="arrow-down"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Real Stories, <span className="highlight">Real Impact</span></h2>
          <p className="section-subtitle">
            Join thousands of users creating safer online spaces. Every report makes a difference.
          </p>
        </div>

        <div className="features-grid2">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/anonymity.webp" alt="Anonymity & Security" />
            </div>
            <h3>Anonymity & Security</h3>
            <p>Your identity stays protected with end-to-end encryption while reporting harassment.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/report.jpg" alt="Seamless Reporting" />
            </div>
            <h3>One-Click Reporting</h3>
            <p>Our intuitive interface makes reporting quick and effortless for everyone.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/community.jpg" alt="Community Support" />
            </div>
            <h3>Community Support</h3>
            <p>Connect with a global network committed to positive online experiences.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="steps-section">
        <p className="steps-section-box">Safety</p>
        <div className="section-header">

          <h2>Simple 3-Step Protection</h2>
          <p className="section-subtitle">
            Take action against online harassment quickly and effectively.
          </p>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Install</h3>
              <p>Add SafeWeb to your browser in seconds. Lightweight and unobtrusive.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Report</h3>
              <p>Capture harassment with our AI-powered tools. Simple and comprehensive.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Track</h3>
              <p>Monitor your reports and see your impact on creating safer spaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>Trusted by <span className="highlight">IGDTUW</span></h2>
          <p className="section-subtitle">
            Here's why users tend to choose SafeWeb
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              SafeWeb helped me report cyberbullying I faced on Instagram. The anonymous reporting feature gave me courage to speak up without fear of retaliation.
            </p>
            <div className="user-info">
              <span className="user-name">Avwal Kaur</span>
              <span className="user-role">CSE Student, IGDTUW</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              As the Women's Cell coordinator, SafeWeb has been invaluable in tracking harassment cases on campus forums. The dashboard helps us identify repeat offenders.
            </p>
            <div className="user-info">
              <span className="user-name">Anjali Dass</span>
              <span className="user-role">CSE student , IGDTUW</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              When I received inappropriate LinkedIn messages, SafeWeb's one-click evidence collection made reporting so easy. Now I feel safer networking online.
            </p>
            <div className="user-info">
              <span className="user-name">Anushka Jha</span>
              <span className="user-role">CSE Student, IGDTUW</span>
            </div>
          </div>

          {/* Additional Indian student testimonials */}
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              The AI detection in SafeWeb identified toxic comments in my YouTube videos that I had missed. It's like having a digital bodyguard!
            </p>
            <div className="user-info">
              <span className="user-name">Janvi Behal</span>
              <span className="user-role">CSE Student, IGDTUW</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              After facing casteist slurs on Twitter, SafeWeb's community support connected me with legal resources. The solidarity gave me strength.
            </p>
            <div className="user-info">
              <span className="user-name">Bableen Kaur </span>
              <span className="user-role">CSE Student</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              As an IGDTUW coding club moderator, SafeWeb helps us maintain respectful discussions. The sentiment analysis flags issues before they escalate.
            </p>
            <div className="user-info">
              <span className="user-name">Aabha Bhandari</span>
              <span className="user-role">CSE Student, IGDTUW</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;