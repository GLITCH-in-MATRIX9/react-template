import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Report from "./pages/Report";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn"; // Import SignIn page
import SignUp from "./pages/SignUp"; // Import SignUp page
import "./App.css";

function App() {

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
    <Router>
      <div className="App">
        {/* floating objects */}
        <div className="floating-objects">
         {floatingLogos}
         {floatingSquares}
        </div>

        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<Report />} />
            <Route path="/signin" element={<SignIn />} /> {/* Add SignIn route */}
            <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;