import React from "react";
import "../App.css";

function DestinationChild(props) {
  const { destination, destinationId, displayInfo } = props;
  const displayInfoParams = () => {
    displayInfo(destinationId);
  };
  return (
    <div className="map-point">
      <div onClick={displayInfoParams}></div>
    </div>
  );
}

export default DestinationChild;
