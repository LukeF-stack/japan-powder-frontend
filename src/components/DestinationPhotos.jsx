import React from "react";
import "../App.css";
import PhotoGallery from "./PhotoGallery";
//import PhotoGallery from "./PhotoGallery";
//import PhotoGallery from "./PhotoGallery";

function DestinationPhotos(props) {
  return (
    <div className="destination-photos">
      <PhotoGallery db="destinations" id={props.match.params.id} />
    </div>
  );
}

export default DestinationPhotos;
