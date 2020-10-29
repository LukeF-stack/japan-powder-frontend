import React, { useContext } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import { User } from "./User";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function SignOutBtn() {
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const signOut = () => {
    setUser(User.props);
    localStorage.removeItem("token");
    history.push("/");
    NotificationManager.success("Signed Out", "", 2000);
  };
  return <button onClick={signOut}>Sign Out</button>;
}

export default SignOutBtn;
