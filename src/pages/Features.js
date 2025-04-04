import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Features.css";

// Import images from the assets folder
import logo1 from "../assets/logo1.png"; 
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo7 from "../assets/logo7.png";
import logo8 from "../assets/logo8.png";

const features = [
  {
    title: "Real-time Toxicity Detection",
    description: "Instantly identify and mitigate toxicity on major platforms like Reddit and WhatsApp.",
    logo: logo1, // Use the imported image
    image: logo1, // replace this logo1 with new image that anjali will send
  },
  {
    title: "Content Filtering",
    description: "Seamlessly filter and block harmful or inappropriate content in real-time.",
    logo: logo2,
    image: logo2,
  },
  {
    title: "Downloadable Reports & Graphs",
    description: "Generate comprehensive reports and visualize analytics with downloadable graphs.",
    logo: logo3,
    image: logo3,
  },
  {
    title: "Blur Intensity Setter",
    description: "Customize content visibility with an adjustable blur intensity feature.",
    logo: logo4,
    image: logo4,
  },
  {
    title: "Category-wise Detection",
    description: "Detect and classify toxicity across multiple categories for better analysis.",
    logo: logo5,
    image: logo5,
  },
  {
    title: "Interactive Cybersecurity Chatbot",
    description: "Access instant support with our intelligent cybersecurity chatbot.",
    logo: logo6,
    image: logo6,
  },
  // {
  //   title: "Advanced Security Features",
  //   description: "Utilize advanced protocols to enhance data security and privacy.",
  //   logo: logo7,
  //   image: logo7,
  // },
  {
    title: "Cross-Platform Compatibility", //8
    description: "Experience seamless performance across various devices and platforms.",
    logo: logo8,
    image:logo8,
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
      {/* <div className="glowing-grid"></div> */}
      <div className="particles-container">
  {Array.from({ length: 100 }).map((_, index) => {
    const color = Math.random() > 0.5 ? "#fff" : "#5d84fe"; // Randomly assign neon blue or neon purple
    return (
      <div
        key={index}
        className="particle"
        style={{
          top: `${Math.random() * 120}%`,
          left: `${Math.random() * 120}%`,
          animationDelay: `${Math.random() * 0.5}s`,
          width: `${Math.random() * 8 + 2}px`, // Larger particles (8px to 20px)
          height: `${Math.random() * 8 + 2}px`, // Larger particles (8px to 20px)
          backgroundColor: color, // Assign the random color
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`, // Add glow effect
        }}
      ></div>
    );
  })}
</div>

      {/* Features Heading
      <div className="features-heading">
        <h1>Discover the Features That Make SafeWeb Unique</h1>
      </div> */}

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
              <p>{selectedFeature.description}</p>
              {/* Display the feature's image beneath the description */}
              <img
                src={selectedFeature.image}
                alt={selectedFeature.title}
                className="feature-image"
              />
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;