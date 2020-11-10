import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { NotificationManager } from "react-notifications";
import { backendUrl } from "./App.jsx";

function Reviews(props) {
  const { user } = useContext(UserContext);
  const { id, state } = props;
  const [refresh, setRefresh] = useState({});
  const [editedReview, setEditedReview] = useState(null);
  const [editedMessage, setEditedMessage] = useState({});
  const [edit, setEdit] = useState({});

  const [reviewResults, setReviewResults] = useState([]);

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        `${backendUrl}/api/reviews/${review_id}`,
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
    //console.log(editedMessage.message);
    //console.log(editedReview);
    const stamp = Date.now();
    const fields = {
      Location_id: editedReview.Location_id,
      Name: user.fullName,
      Body: editedMessage.message,
      User_id: user._id,
      Timestamp: stamp
    };
    //console.log(fields);
    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    };
    try {
      const response = await fetch(
        `${backendUrl}/api/reviews/${editedReview._id}`,
        settings
      );
      const data = await response.json();
      //console.log(data.message);
      if (!data) {
        console.log("problem updating review");
      } else if (data.msg) {
        NotificationManager.error(data.msg);
      } else {
        NotificationManager.success(`Review successfully updated`);
        setEditedReview(null);
        setRefresh(data);
      }
    } catch (e) {
      console.log(e.message);
      //NotificationManager.error("Problem signing in user", "", 2000);
    }
  };

  const change = (e) => {
    setEditedMessage({ [e.target.name]: e.target.value });
    //console.log(editedReview.message);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //console.log(editedMessage.message);
    createEditedReview();
    // setEditedReview({
    //   message: ""
    // });
  };

  const getReviews = async () => {
    try {
      const url = new URL(`${backendUrl}/api/reviews`);
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
            <p>{review.Body}</p>
            {user._id === review.User_id ? (
              <div>
                <button
                  onClick={() => {
                    setEdit(review._id);
                    setEditedReview(review);
                  }}
                >
                  edit
                </button>

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
  };

  return (
    <div>
      {editedReview ? <div className="gallery-modal"></div> : null}
      {editedReview ? (
        <div className="edit-review">
          <h4>{editedReview.Name}</h4>
          {editedReview.Timestamp ? (
            <h6>{new Date(editedReview.Timestamp).toDateString()}</h6>
          ) : null}
          <div className="small-form">
            <form action="">
              <textarea
                //maxLength="800"
                name="message"
                type="text"
                value={editedMessage.message}
                placeholder={editedReview.Body}
                onChange={(e) => change(e)}
              />
            </form>
            <div>
              <button
                onClick={(e) => {
                  onSubmit(e);
                  //console.log(editedMessage.message);
                  //setEditedReview({ message: review.Body });
                }}
              >
                submit
              </button>

              <button
                onClick={() => {
                  setEditedReview(null);
                }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="reviews-wrapper">
        <ul>{reviewResults}</ul>
      </div>
    </div>
  );
}

export default Reviews;
