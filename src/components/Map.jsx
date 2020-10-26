import React from "react";
import "../App.css";
import DestinationParent from "./Destination.jsx";
//import { DestinationInfo } from "./Destination.jsx";

class Map extends React.Component {
  render() {
    return (
      <div className="map">
        <section className="homePage-map">
          <ul>
            <li>
              <DestinationParent />
            </li>
          </ul>
          <div></div>
        </section>
      </div>
    );
  }
}

export default Map;
