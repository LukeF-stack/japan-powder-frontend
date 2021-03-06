import React from "react";
import "../App.css";

function Weather(props) {
  const { currentWeather, forecast } = props;
  return (
    <div className="weather-grid">
      <div className="weather">
        <h4>CURRENT WEATHER</h4>
        <h3>{currentWeather.main}</h3>
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
  );
}

export default Weather;
