import { useEffect, useContext } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import { NotificationManager } from "react-notifications";
//import "react-notifications/lib/notifications.css";

function SignInUser(props) {
  const { userData } = props;
  userData["authenticated"] = true;
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    setUser(userData);
    history.push("/");
    console.log(`Welcome ${userData.fullName}`);
    NotificationManager.success(`Welcome ${userData.fullName}`);
  }, [setUser, userData, history]);
  return null;
}

export default SignInUser;
