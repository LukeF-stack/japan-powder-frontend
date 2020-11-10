import React from "react";
import "../App.css";
import PhotoGallery from "./PhotoGallery";

function ResortPhotos(props) {
  return (
    <div className="destination-photos">
      <PhotoGallery
        db={"resorts"}
        id={props.match.params.id}
        selector="resort"
      />
    </div>
  );
}

export default ResortPhotos;
