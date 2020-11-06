import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { NotificationManager } from "react-notifications";

function Reviews(props) {
  const { user } = useContext(UserContext);
  const { id, state } = props;
  const [refresh, setRefresh] = useState({});

  const [reviewResults, setReviewResults] = useState([]);

  useEffect(() => {
    getReviews();
  }, [user, state, refresh]);

  const deleteReview = async (review_id) => {
    const settings = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    try {
      const response = await fetch(
        `https://dsbn3.sse.codesandbox.io/api/reviews/${review_id}`,
        settings
      );
      const data = await response.json();
      if (data.status !== 500) {
        //console.log(data);
        setRefresh(data);
        NotificationManager.success(data.msg);
      } else {
        NotificationManager.error(data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getReviews = async () => {
    try {
      const url = new URL(`https://dsbn3.sse.codesandbox.io/api/reviews`);
      const params = { Location_id: id };

      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url);
      const results = await response.json();
      //setDestination(destination);
      //console.log(destination);
      const reviews = [];
      results.forEach((review) => {
        //console.log(review);
        reviews.push(
          <li key={review._id} className="review-result-li">
            <div className="review-result">
              <h4>{review.Name}</h4>
              {review.Timestamp ? (
                <h6>{new Date(review.Timestamp).toDateString()}</h6>
              ) : null}
              <p>{review.Body}</p>
              {user._id === review.User_id ? (
                <div>
                  <button>edit</button>
                  <button
                    onClick={() => {
                      deleteReview(review._id);
                    }}
                  >
                    delete
                  </button>
                </div>
              ) : null}
            </div>
          </li>
        );
      });
      setReviewResults(reviews.reverse());
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="reviews-wrapper">
      <ul>{reviewResults}</ul>
    </div>
  );
}

export default Reviews;
