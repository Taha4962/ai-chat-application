import React, { useState } from "react";
import "./homePage.css";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("human1"); // Fixed typo in "setTypingStatus"

  return (
    <div className="home-page">
      {/* Orbital background image */}
      <img src="/orbital.png" alt="Orbital Background" className="orbital" />

      {/* Left section with heading and description */}
      <div className="left">
        <h1>LAMA AI</h1>
        <h2>Supercharge your creativity and productivity.</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          doloremque mollitia nulla sit.
        </h3>
        <Link to="/sign-in" className="Link">
          Get Started
        </Link>
      </div>

      {/* Right section with bot image and chat animation */}
      <div className="right">
        <div className="img-container">
          <div className="bg-container">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="Bot" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : typingStatus === "human3"
                  ? "/human3.jpeg"
                  : "/human4.jpeg"
              }
              alt="Chat Avatar"
            />
            <TypeAnimation
              sequence={[
                "Alice: I love the project’s sleek design and brilliant functionality.",
                2000,
                () => setTypingStatus("human2"),
                "Bob: The project truly redefines efficiency and simplicity in innovation.",
                2000,
                () => setTypingStatus("human3"),
                "Carol: This project impresses with creative vision and outstanding execution.",
                2000,
                () => setTypingStatus("human4"),
                "David: The project remarkably enhances productivity while maintaining stylish, effective simplicity.",
                2000,
                () => setTypingStatus("human1"),
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>

      {/* Footer with terms and privacy links */}
      <div className="terms">
        <img src="/logo.png" alt="Logo" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
