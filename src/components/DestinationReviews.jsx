import React, { useState, useContext } from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";
import { UserContext } from "./UserContext";

function DestinationReviews(props) {
  const { user } = useContext(UserContext);
  const { match } = props;
  const [addReviewShown, setAddReviewShown] = useState({ shown: false });

  const showAddReview = () => {
    setAddReviewShown(true);
  };

  return (
    <div className="destination=reviews">
      <div className="reviews-bar">
        <h2 className="section-title">Reviews</h2>
        {user.authenticated ? (
          <button
            onClick={() => {
              setAddReviewShown((prevState) => ({
                shown: !prevState.shown
              }));
              //setButtonText("cancel");
            }}
          >
            {addReviewShown.shown ? "cancel" : "add a review"}
          </button>
        ) : null}
      </div>
      {addReviewShown.shown ? <AddReviews id={match.params.id} /> : null}
    </div>
  );
}

export default DestinationReviews;
