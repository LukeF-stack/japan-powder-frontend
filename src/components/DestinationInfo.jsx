import React, { useState, useEffect } from "react";
import "../App.css";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function DestinationInfo(props) {
  const { description, island, currentWeather, forecast } = props;

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
          <h6>
            <strong>{island}</strong>
          </h6>
          <div className="weather-grid">
            <div className="weather">
              <h4>CURRENT WEATHER</h4>
              <h3>
                <strong>{currentWeather.main}</strong>
              </h3>
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                alt={currentWeather.main}
              />
              <h5>{currentWeather.description}</h5>
              <h1>{currentWeather.temp}°C</h1>
            </div>
            <div className="forecast-wrapper">
              <h4>WEEKLY FORECAST</h4>
              <ul className="forecast-list">{forecast}</ul>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}

export default DestinationInfo;
