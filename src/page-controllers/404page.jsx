import React, { useState, useEffect } from "react";
import "../App.css";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";
import ParticlesBox from "./../components/Particles";

function ErrorPage() {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);

  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <div className="error-page">
            <div className="error-title-wrapper">
              <h2>SORRY...PAGE NOT FOUND</h2>
            </div>

            <img
              className="errorPage-img"
              src="/images/404.svg"
              alt="404 snowboard"
            />
          </div>

          <ParticlesBox />
        </div>
      )}
    </Transition>
  );
}

export default ErrorPage;
