import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Styles/Features.css";

// Import images from the assets folder
import logo1 from "../assets/logo1.png"; 
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/logo7.png";
import logo8 from "../assets/logo8.png";
import Pic1 from "../assets/Pic1.jpg";
import Pic2 from "../assets/Pic2.jpg";
import Pic3 from "../assets/Pic3.jpg";

const features = [
  {
    title: "Real-time Toxicity Detection",
    shortDescription: "Instantly identify and mitigate toxicity on major platforms like Reddit and WhatsApp.",
    detailedDescription: "Our advanced AI continuously monitors conversations across platforms, detecting toxic content in real-time with 99.7% accuracy. The system flags harmful language as it appears, allowing for immediate intervention.",
    logo: logo1,
    description: "Instantly identify and mitigate toxicity on major platforms like Reddit and WhatsApp.",
    logo: logo1,
    image: logo1,
  },
  {
    title: "Content Filtering",
    shortDescription: "Seamlessly filter and block harmful or inappropriate content in real-time.",
    detailedDescription: "Customize your filtering preferences to automatically block harmful content based on your sensitivity levels. The system adapts to your usage patterns for increasingly accurate filtering.",
    logo: logo2,
  },
  {
    title: "Downloadable Reports & Graphs",
    shortDescription: "Generate comprehensive reports and visualize analytics with downloadable graphs.",
    detailedDescription: "Access detailed analytics about your online interactions with exportable PDF reports and visual graphs. Track toxicity trends over time and share findings with authorities if needed.",
    logo: logo3,
  },
  {
    title: "Blur Intensity Setter",
    shortDescription: "Customize content visibility with an adjustable blur intensity feature.",
    detailedDescription: "Tailor your experience with our adjustable blur feature that lets you control how much questionable content you want to see. Perfect for gradually acclimating to online interactions.",
    logo: logo4,
  },
  {
    title: "Category-wise Detection",
    shortDescription: "Detect and classify toxicity across multiple categories for better analysis.",
    detailedDescription: "Our system classifies toxicity into specific categories (hate speech, threats, harassment, etc.) providing detailed breakdowns of each interaction for precise understanding and response.",
    logo: logo5,
  },
  {
    title: "Interactive Cybersecurity Chatbot",
    shortDescription: "Access instant support with our intelligent cybersecurity chatbot.",
    detailedDescription: "Get immediate help with our 24/7 cybersecurity assistant. It provides legal information, safety protocols, and can connect you with helplines based on Indian cyber laws.",
    logo: logo6,
  },
  {
    title: "Cross-Platform Compatibility",
    shortDescription: "Experience seamless performance across various devices and platforms.",
    detailedDescription: "SafeWeb works consistently across all your devices - smartphones, tablets, and computers - with synchronized settings and protection levels for a unified experience.",
    logo: logo8,
  }
];

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const openPopup = (feature) => {
    setSelectedFeature(feature);
  };

  const closePopup = () => {
    setSelectedFeature(null);
  };

  return (
    <div className="features-page">
      {/* Background Elements */}
      <div className="background-gradient"></div>
      <div className="particles-container">
        {Array.from({ length: 100 }).map((_, index) => {
          const color = Math.random() > 0.5 ? "#fff" : "#5d84fe";
          return (
            <div
              key={index}
              className="particle"
              style={{
                top: `${Math.random() * 120}%`,
                left: `${Math.random() * 120}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
              }}
            ></div>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        {/* Circular Path */}
        <div className="circular-path">
          {/* Text inside the circle */}
          <div className="circle-text">
            Discover The Features That Make SafeWeb Unique
          </div>
          {/* Logos */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-logo"
              onClick={() => openPopup(feature)}
            >
              <img src={feature.logo} alt={feature.title} />
            </motion.div>
          ))}
        </div>

        {/* Feature Popup */}
        {selectedFeature && (
          <div className="feature-popup">
            <div className="popup-content">
              <h2>{selectedFeature.title}</h2>
              <p className="short-description">{selectedFeature.shortDescription}</p>
              <div className="detailed-description">
                <p>{selectedFeature.detailedDescription}</p>
              </div>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>

      <h2 className="section-divider-heading">How SafeWeb Protects Your Digital Experience</h2>

      {/* Alternating Image-Description Section */}
      <div className="alternating-section">
        {[
          {
            image: Pic1,
            title: "Real-time Protection",
            description: "Our AI scans conversations in real-time across platforms, instantly flagging toxic content before it reaches you. The system learns from each interaction to provide increasingly accurate protection."
          },
          {
            image: Pic2,
            title: "Comprehensive Analytics",
            description: "Get instant, detailed toxicity analysis with percentage scores across multiple categories. Our system detects harmful content with 99.7% accuracy and provides actionable PDF reports you can download for record-keeping or further analysis."
          },
          {
            image: Pic3,
            title: "24/7 Cybersecurity Assistant",
            description: "Our intelligent chatbot provides immediate help with cyber threats, legal information, and safety protocols. Whether you need helpline numbers, explanations of Indian cyber laws, or quick safety tips, SafeWeb Bot is always available."
          },
        ].map((item, index) => (
          <div 
            key={index}
            className={`alternating-row ${index % 2 === 0 ? '' : 'reverse'}`}
          >
            <motion.div 
              className="alternating-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={item.image} alt={item.title} />
            </motion.div>
            <div className="alternating-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;