import React, { useContext, useState } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function AddReviews(props) {
  const { id } = props;
  const { user } = useContext(UserContext);
  const [review, setReview] = useState({});
  const [isShown, setShown] = useState(false);
  // useEffect(() => {
  //   setShown(shown);
  // }, [shown]);

  const createReview = async () => {
    //console.log("signupPage got", review);

    const fields = {
      Location_id: id,
      Name: user.fullName,
      Body: review.message,
      User_id: user._id
    };

    //console.log(fields);

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    };
    try {
      const response = await fetch(
        `https://dsbn3.sse.codesandbox.io/api/reviews`,
        settings
      );
      const data = await response.json();
      //console.log(data.message);
      if (!data) {
        console.log("problem creating review");
      } else if (data.msg) {
        NotificationManager.error(data.msg);
      } else {
        console.log("data is ", data);
        NotificationManager.success(`Review successfully added`);
        setShown(false);
      }
    } catch (e) {
      console.log(e.message);
      //NotificationManager.error("Problem signing in user", "", 2000);
    }
  };

  const change = (e) => {
    setReview({
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createReview();
    setReview({
      message: ""
    });
  };

  return (
    <div>
      {isShown ? (
        <div className="form form-small">
          <form action="">
            <textarea
              maxLength="800"
              name="message"
              type="text"
              value={review.message}
              placeholder="How was your experience?"
              onChange={(e) => change(e)}
            />
            <button onClick={(e) => onSubmit(e)}>Submit</button>
          </form>
        </div>
      ) : null}
      {user.authenticated ? (
        <button
          className="review-toggle-button"
          onClick={() => {
            setShown((prevState) => !prevState);
            //setButtonText("cancel");
          }}
        >
          {isShown ? "cancel" : "add a review"}
        </button>
      ) : null}
    </div>
  );
}

export default AddReviews;
