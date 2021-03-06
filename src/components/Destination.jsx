import React from "react";
import "../App.css";
import DestinationChild from "./DestinationChild.jsx";
import { Link } from "react-router-dom";
import { backendUrl } from "./App.jsx";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

class DestinationParent extends React.Component {
  state = {
    bool: true,
    destinationTitle: "SELECT A DESTINATION",
    destinationDescription: "click on the destination points to learn more"
  };

  getInfo = async (value, image) => {
    this.setState({ bool: false });
    try {
      const response = await fetch(`${backendUrl}/api/destinations/` + value);
      const data = await response.json();
      this.setState({
        destinationTitle: data.title,
        destinationDescription: data.description,
        destinationId: data._id,
        buttonTitle: "Explore " + data.title,
        island: data.island,
        open_weather_id: data.open_weather_location_id,
        bg_img: data.bg_img,
        bool: true
      });
      document.querySelector(".map").style.opacity = 0.7;
      setTimeout(() => {
        document.querySelector(
          ".map"
        ).style.backgroundImage = `url("${this.state.bg_img}")`;
        document.querySelector(".map").style.opacity = 1;
      }, 500);

      //console.log(this.island);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      // <Transition timeout={200} in={this.state.bool}>
      //   {(state) => (
      <div
        className="destination-bio"
        // style={{
        //   ...defaultStyle,
        //   ...transitionStyles[state]
        // }}
      >
        <Transition timeout={500} in={this.state.bool}>
          {(state) => (
            <h1
              className="map-title"
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {this.state.destinationTitle.toUpperCase()}
            </h1>
          )}
        </Transition>
        <Transition timeout={500} in={this.state.bool}>
          {(state) => (
            <p
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {this.state.destinationDescription}
            </p>
          )}
        </Transition>
        <Transition timeout={500} in={this.state.bool}>
          {(state) => (
            <Link
              to={`/destinations/${this.state.destinationId}/info`}
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              {this.state.buttonTitle ? (
                <h5>{this.state.buttonTitle} &nbsp; &#x279C;</h5>
              ) : null}
            </Link>
          )}
        </Transition>

        <div className="map-buttons">
          <div className="map-img">
            <img src="/images/japan_islands.svg" alt="map of japan" />
          </div>
          <div className="map-btn-wrapper">
            <div className="map-btn-container">
              <DestinationChild
                destination="Hakuba Valley"
                destinationId="5f4f0c4d6dc6a63a00dfd95a"
                displayInfo={this.getInfo}
                open_weather_id={this.state.open_weather_id}
              />
              <DestinationChild
                destination="Niseko"
                destinationId="5f51ee44a99a94584080dc10"
                displayInfo={this.getInfo}
              />
              <DestinationChild
                destination="Sapporo"
                destinationId="5fbf46792d67e76990c2f7c1"
                displayInfo={this.getInfo}
              />
              <DestinationChild
                destination="Shiga Kogen"
                destinationId="5f576091a066892294ead2de"
                displayInfo={this.getInfo}
              />
            </div>
          </div>
        </div>
        <Transition timeout={500} in={this.state.bool}>
          {(state) => (
            <h6
              className="island-description"
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <strong>{this.state.island}</strong>
            </h6>
          )}
        </Transition>
      </div>
      //   )}
      // </Transition>
    );
  }
}

export default DestinationParent;
