import React, { useState, useEffect } from "react";
import "../App.css";
import DestinationNavTabs from "../components/DestinationNavTab.jsx";
import { Switch, Route } from "react-router-dom";
import DestinationInfo from "../components/DestinationInfo";
import DestinationResorts from "../components/DestinationResorts";
import DestinationPhotos from "../components/DestinationPhotos";
import DestinationReviews from "../components/DestinationReviews";
import DestinationFlights from "../components/DestinationFlights";

function DestinationPage({ match }) {
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [theDestination, setDestination] = useState(null);

  useEffect(() => {
    generatePageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theDestination !== null) {
      getWeatherInfo(
        "https://community-open-weather-map.p.rapidapi.com/weather"
      );
      getWeatherInfo(
        "https://community-open-weather-map.p.rapidapi.com/forecast/daily"
      );
    }
  }, [theDestination]);

  const generatePageContent = async () => {
    try {
      const response = await fetch(
        `https://dsbn3.sse.codesandbox.io/api/destinations/${match.params.id}`
      );
      const destination = await response.json();
      setDestination(destination);
      //getWeatherInfo();
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
      const params = { q: theDestination.open_weather_location_id };
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
            // savedForecast["temp_min"] = day.temp.min;
            // savedForecast["temp_max"] = day.temp.max;
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
                <h6>{forecast.main}</h6>
                <p>{forecast.description}</p>
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
    <div className="destination-page">
      {theDestination !== null ? (
        <h1 className="page-title">{theDestination.title}</h1>
      ) : null}
      <DestinationNavTabs match={match} />
      <Switch>
        <Route path="/destinations/:id/info">
          {theDestination !== null ? (
            <DestinationInfo
              description={theDestination.description}
              island={theDestination.island}
              //open_weather_id={destination.open_weather_location_id}
              currentWeather={weather}
              forecast={forecast}
            />
          ) : null}
        </Route>
        <Route exact path="/destinations/:id/resorts">
          <DestinationResorts match={match} />
        </Route>
        <Route exact path="/destinations/:id/photos">
          <DestinationPhotos match={match} />
        </Route>
        <Route exact path="/destinations/:id/reviews">
          <DestinationReviews match={match} />
        </Route>
        <Route exact path="/destinations/:id/flights">
          <DestinationFlights />
        </Route>
      </Switch>
    </div>
  );
}

export default DestinationPage;
