import React, { useEffect, useState } from "react";
import "../App.css";
import ResortNavTabs from "../components/ResortNavTab";
import { Switch, Route } from "react-router-dom";
import ResortInfo from "../components/ResortInfo.jsx";
import ResortPhotos from "../components/ResortPhotos.jsx";
import ResortReviews from "../components/ResortReviews.jsx";
import ResortBookings from "../components/ResortBookings.jsx";
import { backendUrl } from "../components/App.jsx";
import { Transition } from "react-transition-group";
import {
  defaultStyle,
  transitionStyles
} from "./../components/transitionStyles.js";

function ResortPage({ match }) {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInProp(true);
    }, 500);
  }, []);
  useEffect(() => {
    generatePageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [resort, setResort] = useState({});
  const generatePageContent = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/resorts/${match.params.id}`
      );
      const resort = await response.json();
      setResort(resort);
      //console.log(resort);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Transition in={inProp} timeout={500}>
      {(state) => (
        <div
          className="resort-page"
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          {resort.title ? (
            <h1 className="page-title">{resort.title.toUpperCase()}</h1>
          ) : null}
          <ResortNavTabs match={match} />
          <Switch>
            <Route path="/resorts/:id/info">
              <ResortInfo description={resort.description} />
            </Route>
            <Route path="/resorts/:id/photos">
              <ResortPhotos match={match} />
            </Route>
            <Route path="/resorts/:id/reviews">
              <ResortReviews match={match} />
            </Route>
            <Route path="/resorts/:id/bookings">
              <ResortBookings />
            </Route>
          </Switch>
        </div>
      )}
    </Transition>
  );
}

export default ResortPage;
