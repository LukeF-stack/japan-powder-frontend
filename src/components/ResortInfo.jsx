import React from "react";
import "../App.css";

function ResortInfo(props) {
  const { description } = props;
  return (
    <div className="destination-info">
      <p>{description}</p>
    </div>
  );
}

export default ResortInfo;
