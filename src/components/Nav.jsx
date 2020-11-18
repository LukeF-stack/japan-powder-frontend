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
        <Link
          to="/"
          onClick={() => {
            setShown(false);
          }}
        >
          <li>Home</li>
        </Link>
        <Link
          to="/destinations"
          onClick={() => {
            setShown(false);
          }}
        >
          <li>Destinations</li>
        </Link>
        {/* <Link to="/about">
          <li>About</li>
        </Link> */}
        {/* <Link to="/contact">
          <li>Contact</li>
        </Link> */}
        {!user.authenticated ? (
          <Link
            to="/signup"
            onClick={() => {
              setShown(false);
            }}
          >
            <li>Sign Up</li>
          </Link>
        ) : null}
        {!user.authenticated ? (
          <Link
            to="/signin"
            onClick={() => {
              setShown(false);
            }}
          >
            <li>Sign In</li>
          </Link>
        ) : null}
        {user.authenticated ? (
          <Link
            to="/account"
            onClick={() => {
              setShown(false);
            }}
          >
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
        <div className={`burger-line line-1 line-${shown}`}></div>
        <div className={`burger-line line-2 line-${shown}`}></div>
        <div className={`burger-line line-3 line-${shown}`}></div>
      </div>
    </nav>
  );
}

export default Nav;
