import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import { UserContext } from "../components/UserContext";
import SignOutBtn from "../components/SignOutBtn";
//import Favs from "../components/Favs";
//import SetUserContext from "../components/User";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";
import { Helmet } from "react-helmet";
import { backendUrl } from "../components/App.jsx";

function AccountPage() {
  const [inProp, setInProp] = useState(false);
  const { user } = useContext(UserContext);

  const [reviewResults, setReviewResults] = useState([]);

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getReviews = async () => {
    try {
      const url = new URL(`${backendUrl}/api/reviews`);
      const params = { User_id: user._id };

      url.search = new URLSearchParams(params).toString();

      const response = await fetch(url);
      const results = await response.json();
      //setDestination(destination);
      //console.log(destination);
      generateReviewsList(results);
    } catch (e) {
      console.log(e.message);
    }
  };

  const generateReviewsList = (results) => {
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
  };

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);
  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="account-details"
        >
          <Helmet>
            <title>Account</title>
          </Helmet>
          <h1 className="page-title">Account</h1>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <h2>{user.fullName}</h2>
          <h3>{user.email}</h3>
          {/* <Favs /> */}
          <div className="reviews-wrapper reviews-wrapper-account">
            <ul>{reviewResults}</ul>
          </div>
          <SignOutBtn />
        </div>
      )}
    </Transition>
  );
}

export default AccountPage;
