import React from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";
// import Reviews from "./Reviews.jsx";

function DestinationReviews(props) {
  const { match } = props;

  return (
    <div className="destination=reviews">
      <div className="reviews-bar">
        <h3 className="section-title">Reviews</h3>
      </div>

      <AddReviews id={match.params.id} />
      {/* <Reviews id={match.params.id} /> */}
    </div>
  );
}

export default DestinationReviews;
