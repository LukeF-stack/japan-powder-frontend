import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function Favs() {
  const { user } = useContext(UserContext);

  const list = [];

  const [state, setState] = useState([]);

  useEffect(() => {
    getFavDestinations();
    //console.log(user.favs_destinations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getFavDestinations = async () => {
    if (user.favs_destinations && user.favs_destinations.length > 0) {
      console.log("getting favs");
      try {
        const url = new URL(
          "https://dsbn3.sse.codesandbox.io/api/destinations"
        );
        const favsIds = await user.favs_destinations;
        const params = await { ids: favsIds };
        url.search = new URLSearchParams(params).toString();
        const response = await fetch(url);
        const destinations = await response.json();
        //console.log(resorts);
        //const results = resorts;
        console.log(destinations);
        destinations.forEach((destination) => {
          //console.log(destination);
          list.push(
            <li key={destination._id}>
              <Link to={`/destinations/${destination._id}/info`}>
                <div className="resort-result">
                  <h5>{destination.title}</h5>
                  <img
                    src={destination.cover_img}
                    alt={destination.title}
                  ></img>
                </div>
              </Link>
            </li>
          );

          setState(list);
          //console.log("list is ", list);
          //this.setState({ list: this.list });
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <div>
      <h2>Favs</h2>
      <ul>{state}</ul>
    </div>
  );
}

export default Favs;
