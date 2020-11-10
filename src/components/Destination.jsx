import React from "react";
import "../App.css";
import DestinationChild from "./DestinationChild.jsx";
import { Link } from "react-router-dom";
import { backendUrl } from "./App.jsx";

class DestinationParent extends React.Component {
  state = {
    destinationTitle: "SELECT A DESTINATION",
    destinationDescription: "click on the destination points to learn more"
  };
  getInfo = async (value) => {
    try {
      const response = await fetch(`${backendUrl}/api/destinations/` + value);
      const data = await response.json();
      this.setState({
        destinationTitle: data.title,
        destinationDescription: data.description,
        destinationId: data._id,
        buttonTitle: "Explore " + data.title,
        island: data.island,
        open_weather_id: data.open_weather_location_id
      });
      //console.log(this.island);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <div className="destination-bio">
        <h1 className="map-title">
          {this.state.destinationTitle.toUpperCase()}
        </h1>
        <p>{this.state.destinationDescription}</p>
        <Link to={`/destinations/${this.state.destinationId}/info`}>
          {this.state.buttonTitle ? (
            <h5> {this.state.buttonTitle} &nbsp; &#x279C;</h5>
          ) : null}
        </Link>
        <h6 className="island-description">
          <strong>{this.state.island}</strong>
        </h6>
        <div className="map-buttons">
          <div className="map-img">
            <img src="/public/images/japan_islands.svg" alt="map of japan" />
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
                destination="Shiga Kogen"
                destinationId="5f576091a066892294ead2de"
                displayInfo={this.getInfo}
              />
              <DestinationChild
                destination="Rusutsu"
                destinationId="5f5761d6a066892294ead2df"
                displayInfo={this.getInfo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DestinationParent;
