import React, { useEffect, useState } from "react";
import "../App.css";
import PhotoGallery from "./PhotoGallery";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function ResortPhotos(props) {
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
            db={"resorts"}
            id={props.match.params.id}
            selector="resort"
          />
        </div>
      )}
    </Transition>
  );
}

export default ResortPhotos;
