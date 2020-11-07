import React, { useContext } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { backendUrl } from "./App.jsx";

function FavBtn(props) {
  const { user } = useContext(UserContext);
  const favsBody = { favs_destinations: props.id };
  const addToFavs = () => {
    fetch(`${backendUrl}/api/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favsBody)
    })
      .then((res) => {
        // log the response
        //console.log(res);
        // if the response wasn't a success response, show problem notification
        if (res.status !== 200) {
          console.log("problem updating user");
        } else {
          // else (success) show success notification & reload page
          console.log("user updated");
          console.log(res);
        }
      })
      // catch errors
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {user.authenticated ? (
        <button className="fav-btn" onClick={addToFavs}></button>
      ) : null}
    </div>
  );
}

export default FavBtn;
