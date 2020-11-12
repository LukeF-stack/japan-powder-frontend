import React, { useState, useEffect } from "react";
import "../App.css";
import Map from "../components/Map";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function DestinationsPage() {
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
          <Map />
        </div>
      )}
    </Transition>
  );
}

export default DestinationsPage;
