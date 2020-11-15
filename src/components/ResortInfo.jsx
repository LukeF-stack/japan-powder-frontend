import React from "react";
import "../App.css";
import Weather from "./Weather";

function ResortInfo(props) {
  const { description, currentWeather, forecast } = props;
  return (
    <div className="destination-info">
      <p>{description}</p>
      <Weather currentWeather={currentWeather} forecast={forecast} />
    </div>
  );
}

export default ResortInfo;
