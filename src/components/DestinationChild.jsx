import React from "react";
import "../App.css";

function DestinationChild(props) {
  const { destination, destinationId, displayInfo } = props;
  const displayInfoParams = () => {
    displayInfo(destinationId);
  };
  return (
    <div>
      <button onClick={displayInfoParams} className="map-point"></button>
    </div>
  );
}

export default DestinationChild;
