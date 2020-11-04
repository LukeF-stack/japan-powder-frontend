import React, { useState } from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";

function DestinationReviews(props) {
  const { match } = props;
  const [addReviewShown, setAddReviewShown] = useState(false);

  const showAddReview = () => {
    setAddReviewShown(true);
  };

  return (
    <div className="destination=reviews">
      <div className="reviews-bar">
        <h2 className="section-title">Reviews</h2>
        <button
          onClick={() => {
            setAddReviewShown(true);
          }}
        >
          Add a Review
        </button>
      </div>
      {addReviewShown ? <AddReviews id={match.params.id} /> : null}
    </div>
  );
}

export default DestinationReviews;
