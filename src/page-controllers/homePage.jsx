import React, { useState, useEffect } from "react";
import "../App.css";
import HomePageHero from "../components/HomePageHero.jsx";
import Map from "../components/Map.jsx";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";
import { Helmet } from "react-helmet";

function HomePage() {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);
  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div
          className="home"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <Helmet>
            <title>Powder Japan</title>
          </Helmet>
          <section>
            <HomePageHero />
          </section>
          <section>
            <Map />
          </section>
        </div>
      )}
    </Transition>
  );
}

export default HomePage;
