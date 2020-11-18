import React, { useState, useEffect } from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";
// import Reviews from "./Reviews.jsx";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function DestinationReviews(props) {
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
          <div className="reviews-bar">
            <h3 className="section-title">Reviews</h3>
          </div>

          <AddReviews id={match.params.id} selector="destination" />
        </div>
      )}
    </Transition>
  );
}

export default DestinationReviews;
