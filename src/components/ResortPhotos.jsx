import React from "react";
import "../App.css";
import PhotoGallery from "./PhotoGallery";

function ResortPhotos(props) {
  return (
    <div className="destination-photos">
      <h1 className="section-title">Photos</h1>
      <PhotoGallery db={"resorts"} id={props.match.params.id} />
    </div>
  );
}

export default ResortPhotos;
