import React, { useState, useMemo, useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import "../App.css";
import Nav from "./Nav";
import HomePage from "../page-controllers/homePage";
import DestinationsPage from "../page-controllers/destinationsPage";
import DestinationPage from "../page-controllers/destinationPage";
//import AboutPage from "../page-controllers/aboutPage";
//import ContactPage from "../page-controllers/contactPage";
import ResortPage from "../page-controllers/resortPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import SignUpPage from "../page-controllers/signupPage";
import SignInPage from "../page-controllers/signinPage";
import AccountPage from "../page-controllers/accountPage";
import { Transition } from "react-transition-group";
//import SetUser from "./SetUser";
//import SetUserContext from "./User";
import { User } from "./User";
import { defaultStyle, transitionStyles } from "./transitionStyles.js";

export const backendUrl = "https://powder-japan-api.herokuapp.com";

//import { useHistory } from "react-router-dom";
//import DestinationInfo from "./DestinationInfo";

function App() {
  const [user, setUser] = useState(User.props);

  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`${backendUrl}/api/auth/validate`, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then((res) => {
          if (res.status !== 200) {
            localStorage.removeItem("token");
            setUser(User.props);
            console.log("token not valid");
          } else {
            res.json().then((res) => {
              console.log("User Authenticated");
              const userData = {
                favs_destinations: res.user.favs_destinations,
                _id: res.user._id,
                fullName: res.user.fullName,
                email: res.user.email,
                authenticated: true
              };
              if (res.user.favs_destinations) {
                userData["favs_destinations"] = res.user.favs_destinations;
              }
              //console.log(userData);
              setUser(userData);
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      console.log("No local token, please sign in");
    }
  }, []);

  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);

  return (
    <Router>
      <Transition in={inProp} timeout={0} appear={true}>
        {(state) => (
          <div
            className="App"
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            <UserContext.Provider value={providerUser}>
              <Nav />
              <Switch>
                <Route
                  path="/"
                  exact
                  component={HomePage}
                  onChange={() => {
                    console.log("change");
                  }}
                />
                <Route
                  path="/destinations"
                  exact
                  component={DestinationsPage}
                />
                <Route path="/destinations/:id" component={DestinationPage} />
                <Route path="/resorts/:id" component={ResortPage} />
                <Route path="/signup" exact component={SignUpPage} />
                <Route path="/signin" exact component={SignInPage} />
                {user.authenticated ? (
                  <Route path="/account" exact component={AccountPage} />
                ) : null}
              </Switch>
              <NotificationContainer />
            </UserContext.Provider>
          </div>
        )}
      </Transition>
    </Router>
  );
}
export default App;
