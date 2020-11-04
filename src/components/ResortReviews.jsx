import React from "react";
import "../App.css";
import Reviews from "./Reviews.jsx";

function ResortReviews(props) {
  return (
    <div className="destination=reviews">
      <h1 className="section-title">Reviews</h1>
      <Reviews />
    </div>
  );
}

export default ResortReviews;
