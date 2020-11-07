import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { NotificationManager } from "react-notifications";

function Reviews(props) {
  const { user } = useContext(UserContext);
  const { id, state } = props;
  const [refresh, setRefresh] = useState({});
  const [editedReview, setEditedReview] = useState({});
  const [edit, setEdit] = useState({});

  const [reviewResults, setReviewResults] = useState([]);

  useEffect(() => {
    getReviews();
  }, [user, state, refresh, edit]);

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

  const createEditedReview = async () => {
    //console.log(editedReview.message);
    // const stamp = Date.now();
    // const fields = {
    //   Location_id: id,
    //   Name: user.fullName,
    //   Body: review.message,
    //   User_id: user._id,
    //   Timestamp: stamp
    // };
    // //console.log(fields);
    // const settings = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(fields)
    // };
    // try {
    //   const response = await fetch(
    //     `https://dsbn3.sse.codesandbox.io/api/reviews`,
    //     settings
    //   );
    //   const data = await response.json();
    //   //console.log(data.message);
    //   if (!data) {
    //     console.log("problem creating review");
    //   } else if (data.msg) {
    //     NotificationManager.error(data.msg);
    //   } else {
    //     //console.log("data is ", data);
    //     NotificationManager.success(`Review successfully added`);
    //     setShown(false);
    //     setState(data);
    //   }
    // } catch (e) {
    //   console.log(e.message);
    //   //NotificationManager.error("Problem signing in user", "", 2000);
    // }
  };

  const change = (e) => {
    setEditedReview({ [e.target.name]: e.target.value });
    console.log(editedReview.message);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(editedReview.message);
    //createEditedReview();
    // setEditedReview({
    //   message: ""
    // });
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
            {
              edit !== review._id ? <p>{review.Body}</p> : null
              // <form action="">
              //   <textarea
              //     //maxLength="800"
              //     name="message"
              //     type="text"
              //     value={editedReview.message}
              //     //placeholder="How was your experience?"
              //     onChange={(e) => change(e)}
              //   />
              // </form>
            }
            {user._id === review.User_id ? (
              <div>
                {edit !== review._id ? (
                  <button
                    onClick={() => {
                      setEdit(review._id);
                      showEditBox(review);
                      //setEditedReview({ message: review.Body });
                    }}
                  >
                    edit
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      //console.log(editedReview.message);
                      onSubmit(e);
                    }}
                  >
                    submit
                  </button>
                )}
                {edit !== review._id ? (
                  <button
                    onClick={() => {
                      deleteReview(review._id);
                    }}
                  >
                    delete
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEdit({});
                    }}
                  >
                    cancel
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </li>
      );
    });
    setReviewResults(reviews.reverse());
  };

  const [editBox, setEditBox] = useState([]);

  const showEditBox = (review) => {
    console.log(review);
    const object = [];
    // object.push(
    // <form action="">
    //   <textarea
    //     //maxLength="800"
    //     name="message"
    //     type="text"
    //     value={editedReview.message}
    //     //placeholder="How was your experience?"
    //     onChange={(e) => change(e)}
    //   />
    // </form>
    // );
    setEditBox(
      <form action="">
        <textarea
          //maxLength="800"
          name="message"
          type="text"
          value={editedReview.message}
          //placeholder="How was your experience?"
          onChange={(e) => change(e)}
        />
      </form>
    );
  };

  return (
    <div className="reviews-wrapper">
      <ul>{reviewResults}</ul>
      <div className="form small-form">
        <form action="">
          <textarea
            //maxLength="800"
            name="message"
            type="text"
            value={editedReview.message}
            //placeholder="How was your experience?"
            onChange={(e) => change(e)}
          />
        </form>
      </div>
    </div>
  );
}

export default Reviews;
