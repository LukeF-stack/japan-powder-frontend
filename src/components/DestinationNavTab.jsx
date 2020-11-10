import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
//import FavBtn from "./FavBtn";

class DestinationNavTabs extends React.Component {
  infoLink = `/destinations/${this.props.match.params.id}/info`;
  resortsLink = `/destinations/${this.props.match.params.id}/resorts`;
  photosLink = `/destinations/${this.props.match.params.id}/photos`;
  reviewsLink = `/destinations/${this.props.match.params.id}/reviews`;
  flightsLink = `/destinations/${this.props.match.params.id}/flights`;
  render() {
    return (
      <div>
        <ul className="nav-tabs">
          <Link to={this.infoLink}>
            <li>Info</li>
          </Link>
          <Link to={this.resortsLink}>
            <li>Resorts</li>
          </Link>
          <Link to={this.photosLink}>
            <li>Photos</li>
          </Link>
          <Link to={this.reviewsLink}>
            <li>Reviews</li>
          </Link>
          {/* <Link to={this.flightsLink}>
            <li>Flights</li>
          </Link>
          <FavBtn id={this.props.match.params.id} /> */}
        </ul>
      </div>
    );
  }
}

export default DestinationNavTabs;
