import React from "react";
import "../App.css";
import Reviews from "./Reviews.jsx";

function DestinationReviews(props) {
  const { match } = props;
  return (
    <div className="destination=reviews">
      <h1 className="section-title">Reviews</h1>
      <Reviews id={match.params.id} />
    </div>
  );
}

export default DestinationReviews;
