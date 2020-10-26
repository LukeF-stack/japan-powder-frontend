import React from "react";
import "../App.css";
import DestinationChild from "./DestinationChild.jsx";
import { Link } from "react-router-dom";

class DestinationParent extends React.Component {
  state = {
    destinationTitle: "Select a destination"
  };
  getInfo = async (value) => {
    try {
      const response = await fetch(
        "https://dsbn3.sse.codesandbox.io/api/destinations/" + value
      );
      const data = await response.json();
      this.setState({
        destinationTitle: data.title,
        destinationDescription: data.description,
        destinationId: data._id,
        buttonTitle: "View " + data.title,
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
        <h1 className="map-title">{this.state.destinationTitle}</h1>
        <p>{this.state.destinationDescription}</p>
        <Link to={`/destinations/${this.state.destinationId}/info`}>
          <h5>{this.state.buttonTitle}</h5>
        </Link>
        <h6>
          <strong>{this.state.island}</strong>
        </h6>
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
    );
  }
}

export default DestinationParent;
