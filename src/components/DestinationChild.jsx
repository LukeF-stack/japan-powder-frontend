import React from "react";
import "../App.css";

function DestinationChild(props) {
  const { destination, destinationId, displayInfo, image } = props;
  const id = destination.toLowerCase().split(" ").join("_");
  const displayInfoParams = () => {
    displayInfo(destinationId, image);
  };
  return (
    <button onClick={displayInfoParams} className="map-point" id={id}></button>
  );
}

export default DestinationChild;
