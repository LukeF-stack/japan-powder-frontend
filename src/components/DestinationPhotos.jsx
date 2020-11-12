import React, { useState, useEffect } from "react";
import "../App.css";
import PhotoGallery from "./PhotoGallery";
//import PhotoGallery from "./PhotoGallery";
//import PhotoGallery from "./PhotoGallery";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function DestinationPhotos(props) {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);
  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div
          className="destination-photos"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <PhotoGallery
            db="destinations"
            id={props.match.params.id}
            selector="destination"
          />
        </div>
      )}
    </Transition>
  );
}

export default DestinationPhotos;
