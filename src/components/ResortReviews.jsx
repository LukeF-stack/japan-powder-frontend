import React from "react";
import "../App.css";
import AddReviews from "./AddReviews.jsx";

function ResortReviews(props) {
  return (
    <div className="destination=reviews">
      <h1 className="section-title">Reviews</h1>
      <AddReviews />
    </div>
  );
}

export default ResortReviews;
