import React, { useState, useEffect } from "react";
import "../App.css";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";
import Weather from "./Weather";

function DestinationInfo(props) {
  const { description, /*island,*/ currentWeather, forecast } = props;

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
          className="destination-info"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <p>{description}</p>
          {/* <h6>
            <strong>{island}</strong>
          </h6> */}
          <Weather currentWeather={currentWeather} forecast={forecast} />
        </div>
      )}
    </Transition>
  );
}

export default DestinationInfo;
