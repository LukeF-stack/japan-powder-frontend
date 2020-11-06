import React, { useState, useContext } from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";
import { UserContext } from "./UserContext";

function DestinationReviews(props) {
  const { user } = useContext(UserContext);
  const { match } = props;
  const [addReviewShown, setAddReviewShown] = useState({ shown: false });

  return (
    <div className="destination=reviews">
      <div className="reviews-bar">
        <h3 className="section-title">Reviews</h3>
        {/* {user.authenticated ? (
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
        ) : null} */}
      </div>

      <AddReviews id={match.params.id} shown={addReviewShown.shown} />
    </div>
  );
}

export default DestinationReviews;
