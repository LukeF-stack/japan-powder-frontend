import React, { useEffect, useState } from "react";
import "../App.css";
import ResortNavTabs from "../components/ResortNavTab";
import { Switch, Route } from "react-router-dom";
import ResortInfo from "../components/ResortInfo.jsx";
import ResortPhotos from "../components/ResortPhotos.jsx";
import ResortReviews from "../components/ResortReviews.jsx";
import ResortBookings from "../components/ResortBookings.jsx";
import { backendUrl } from "../components/App.jsx";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function ResortPage({ match }) {
  const [inProp, setInProp] = useState(false);
  const [resort, setResort] = useState({});
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);
  useEffect(() => {
    generatePageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resort !== null) {
      getWeatherInfo(
        "https://community-open-weather-map.p.rapidapi.com/weather"
      );
      getWeatherInfo(
        "https://community-open-weather-map.p.rapidapi.com/forecast/daily"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resort]);

  const generatePageContent = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/resorts/${match.params.id}`
      );
      const resort = await response.json();
      setResort(resort);
      //console.log(resort);
    } catch (e) {
      console.log(e);
    }
  };

  const getWeatherInfo = async (endpoint) => {
    function convertTemp(value) {
      let celcius = value - 273.15;
      let roundedTemp = (Math.round(celcius * 100) / 100).toFixed(1);
      return roundedTemp;
    }
    try {
      const settings = {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": "23486abf9amsh0e62ec82af84999p138781jsn74da7f1f870a"
        }
      };
      const url = new URL(endpoint);
      //const query = destination.open_weather_location_id;
      //console.log("destination is", theDestination);
      const params = { q: resort.open_weather_location_id };
      url.search = new URLSearchParams(params).toString();
      const response = await fetch(url, settings);
      const currentWeather = await response.json();

      if (
        endpoint === "https://community-open-weather-map.p.rapidapi.com/weather"
      ) {
        //console.log(currentWeather);
        const savedWeather = {};
        //console.log("current weather is", currentWeather);
        if (currentWeather.weather) {
          currentWeather.weather.forEach((result) => {
            savedWeather["id"] = result.id;
            savedWeather["main"] = result.main;
            savedWeather["description"] = result.description;
            savedWeather["icon"] = result.icon;
            //console.log(savedWeather);
          });
        }
        if (currentWeather.main) {
          savedWeather["temp"] = convertTemp(currentWeather.main.temp);
        }
        setWeather(savedWeather);
      } else if (
        endpoint ===
        "https://community-open-weather-map.p.rapidapi.com/forecast/daily"
      ) {
        //console.log("forecast is", currentWeather);
        const savedForecast = [];
        let forecastIndex = 0;
        if (currentWeather.list) {
          //console.log("list exists", currentWeather.list);
          currentWeather.list.forEach((day) => {
            //console.log(day);
            let dtDate = new Date();
            dtDate.setTime(day.dt * 1000);

            const forecast = {};
            forecast["date"] = dtDate.toDateString();
            forecast["temp_min"] = convertTemp(day.temp.min);
            forecast["temp_max"] = convertTemp(day.temp.max);
            forecast["index"] = forecastIndex;
            forecastIndex += 1;
            day.weather.forEach((result) => {
              forecast["id"] = result.id;
              forecast["main"] = result.main;
              forecast["description"] = result.description;
              forecast["icon"] = result.icon;
            });
            const imageUrl = `http://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
            savedForecast.push(
              <li key={forecast.index}>
                <p>
                  <strong>{forecast.date}</strong>
                </p>
                <img
                  src={imageUrl}
                  alt={forecast.main}
                  className="weather-icon"
                />
                {/* <h6>{forecast.main}</h6> */}

                <h6>
                  {forecast.temp_min} - {forecast.temp_max}°C
                </h6>
              </li>
            );
          });
          setForecast(savedForecast);
          //console.log("saved forecast is", savedForecast);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div
          className="resort-page"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          {resort.title ? (
            <h1 className="page-title">{resort.title.toUpperCase()}</h1>
          ) : null}
          <ResortNavTabs match={match} />
          <Switch>
            <Route path="/resorts/:id/info">
              {/* <ResortInfo description={resort.description} /> */}
              {resort !== null ? (
                <ResortInfo
                  description={resort.description}
                  //open_weather_id={destination.open_weather_location_id}
                  currentWeather={weather}
                  forecast={forecast}
                />
              ) : null}
            </Route>
            <Route path="/resorts/:id/photos">
              <ResortPhotos match={match} />
            </Route>
            <Route path="/resorts/:id/reviews">
              <ResortReviews match={match} />
            </Route>
            <Route path="/resorts/:id/bookings">
              <ResortBookings />
            </Route>
          </Switch>
        </div>
      )}
    </Transition>
  );
}

export default ResortPage;
