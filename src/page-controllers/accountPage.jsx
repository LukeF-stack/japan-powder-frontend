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

function AccountPage() {
  const [inProp, setInProp] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);
  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <Helmet>
            <title>Account</title>
          </Helmet>
          <h1 className="page-title">Account</h1>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <h2>{user.fullName}</h2>
          <h3>{user.email}</h3>
          {/* <Favs /> */}
          <SignOutBtn />
        </div>
      )}
    </Transition>
  );
}

export default AccountPage;
