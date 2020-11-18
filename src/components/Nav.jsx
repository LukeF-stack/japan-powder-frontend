import React, { useContext, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
//import SetUserContext from "./User";

function Nav() {
  const { user } = useContext(UserContext);
  const [shown, setShown] = useState(false);

  return (
    <nav>
      <div id="logo">
        <Link to="/">
          <img src="/images/powder_logo.svg" alt="Powder Japan Logo" />
        </Link>
      </div>
      <ul className={`nav-links visibility-${shown}`}>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/destinations">
          <li>Destinations</li>
        </Link>
        {/* <Link to="/about">
          <li>About</li>
        </Link> */}
        {/* <Link to="/contact">
          <li>Contact</li>
        </Link> */}
        {!user.authenticated ? (
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
        ) : null}
        {!user.authenticated ? (
          <Link to="/signin">
            <li>Sign In</li>
          </Link>
        ) : null}
        {user.authenticated ? (
          <Link to="/account">
            <li>Account</li>
          </Link>
        ) : null}
      </ul>
      <div
        className="burger"
        onClick={() => {
          setShown((shown) => !shown);
        }}
      >
        <div className="burger-line line-1"></div>
        <div className="burger-line line-2"></div>
        <div className="burger-line line-3"></div>
      </div>
    </nav>
  );
}

export default Nav;
