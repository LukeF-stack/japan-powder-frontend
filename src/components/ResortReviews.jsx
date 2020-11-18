import React, { useState, useEffect } from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function ResortReviews(props) {
  const { match } = props;

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
          className="destination=reviews"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <h1 className="section-title">Reviews</h1>
          <AddReviews id={match.params.id} selector="resort" />
        </div>
      )}
    </Transition>
  );
}

export default ResortReviews;
