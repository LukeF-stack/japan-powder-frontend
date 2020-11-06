import React from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";
import Reviews from "./Reviews.jsx";

function ResortReviews(props) {
  const { match } = props;

  return (
    <div className="destination=reviews">
      <h1 className="section-title">Reviews</h1>
      <AddReviews id={match.params.id} />
    </div>
  );
}

export default ResortReviews;
