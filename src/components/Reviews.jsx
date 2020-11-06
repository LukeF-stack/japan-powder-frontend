import React, { useEffect, useState } from "react";
import "../App.css";

function Reviews(props) {
  const { id, state } = props;

  const [reviewResults, setReviewResults] = useState([]);

  useEffect(() => {
    getReviews();
  }, [state]);

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
