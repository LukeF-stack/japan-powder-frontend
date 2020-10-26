import React from "react";
import "../App.css";

function DestinationInfo(props) {
  const { description, island, currentWeather, forecast } = props;

  return (
    <div className="destination-info">
      <p>{description}</p>
      <h6>
        <strong>{island}</strong>
      </h6>
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
      <div>
        <h4>WEEKLY FORECAST</h4>
        <ul className="forecast-list">{forecast}</ul>
      </div>
    </div>
  );
}

export default DestinationInfo;
