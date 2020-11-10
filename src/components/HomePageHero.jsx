import React from "react";
import "../App.css";
import ParticlesBox from "./Particles";
import Parallax from "react-rellax";

class HomePageHero extends React.Component {
  render() {
    return (
      <div>
        <section className="homePage-hero">
          <div className="hero-background">
            <div className="hero-parallax-wrapper-slow">
              <Parallax speed={-8}>
                <h1 className="homePage-hero-title">POWDER</h1>
              </Parallax>
              <Parallax speed={-4}>
                <h6 className="homePage-hero-subtitle">JAPAN</h6>
              </Parallax>
            </div>
          </div>

          <div className="hero-parallax-wrapper-fast">
            <Parallax speed={4} percentage="0.6">
              <div className="hero-overlay"></div>
            </Parallax>
          </div>
        </section>

        <ParticlesBox />
      </div>
    );
  }
}

export default HomePageHero;
