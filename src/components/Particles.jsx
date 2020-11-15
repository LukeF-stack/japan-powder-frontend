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
              value: 260,
              density: {
                enable: true
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
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble"
              }
            },
            modes: {
              bubble: {
                distance: 300,
                size: 5,
                duration: 3
              },
              repulse: {
                distance: 90,
                duration: 5
              }
            }
          }
        }}
      />
    </div>
  );
}

export default ParticlesBox;
