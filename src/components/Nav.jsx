import React, { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
//import SetUserContext from "./User";

function Nav() {
  const { user } = useContext(UserContext);
  return (
    <nav>
      <div id="logo">
        <Link to="/">
          <img src="/images/powder_logo.svg" alt="Powder Japan Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/destinations">
          <li>Destinations</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
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
    </nav>
  );
}

export default Nav;
