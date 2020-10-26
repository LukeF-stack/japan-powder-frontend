import React from "react";
import "../App.css";

function DestinationChild(props) {
  const { destination, destinationId, displayInfo } = props;
  const displayInfoParams = () => {
    displayInfo(destinationId);
  };
  return (
    <div>
      <button onClick={displayInfoParams}>{destination}</button>
    </div>
  );
}

export default DestinationChild;
