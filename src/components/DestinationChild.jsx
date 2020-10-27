import React from "react";
import "../App.css";

function DestinationChild(props) {
  const { destination, destinationId, displayInfo } = props;
  const displayInfoParams = () => {
    displayInfo(destinationId);
  };
  return <button onClick={displayInfoParams} className="map-point"></button>;
}

export default DestinationChild;
