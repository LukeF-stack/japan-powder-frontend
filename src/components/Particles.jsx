import React from "react";
import "../App.css";
import Particles from "react-particles-js";

function ParticlesBox() {
  return (
    <div className="particles">
      <Particles
        params={{
          particles: {
            line_linked: { enable: false },
            number: {
              value: 160,
              density: {
                enable: false
              }
            },
            size: {
              value: 3,
              random: true
            },
            move: {
              direction: "bottom",
              out_mode: "out",
              speed: 0.5
            },
            opacity: {
              anim: {
                enable: false,
                opacity_min: 0.5
              }
            }
          }
        }}
      />
    </div>
  );
}

export default ParticlesBox;
