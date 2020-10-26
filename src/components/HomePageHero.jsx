import React from "react";
import "../App.css";
import ParticlesBox from "./Particles";

class HomePageHero extends React.Component {
  render() {
    return (
      <div>
        <section className="homePage-hero">
          <div className="hero-overlay"></div>
          <h1 className="homePage-hero-title">POWDER</h1>
          <h6 className="homePage-hero-subtitle">JAPAN</h6>
        </section>
        <ParticlesBox />
      </div>
    );
  }
}

export default HomePageHero;
