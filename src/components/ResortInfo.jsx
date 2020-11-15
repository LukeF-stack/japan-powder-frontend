import React, { useEffect, useState } from "react";
import "../App.css";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";
import Weather from "./Weather";

function ResortInfo(props) {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);

  const { description, currentWeather, forecast } = props;
  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div
          className="destination-info"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <p>{description}</p>
          <Weather currentWeather={currentWeather} forecast={forecast} />
        </div>
      )}
    </Transition>
  );
}

export default ResortInfo;
