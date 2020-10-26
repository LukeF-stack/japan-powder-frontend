import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

class ResortNavTabs extends React.Component {
  infoLink = `/resorts/${this.props.match.params.id}/info`;
  photosLink = `/resorts/${this.props.match.params.id}/photos`;
  reviewsLink = `/resorts/${this.props.match.params.id}/reviews`;
  bookingsLink = `/resorts/${this.props.match.params.id}/bookings`;
  render() {
    return (
      <div>
        <ul className="nav-tabs">
          <Link to={this.infoLink}>
            <li>Info</li>
          </Link>
          <Link to={this.photosLink}>
            <li>Photos</li>
          </Link>
          <Link to={this.reviewsLink}>
            <li>Reviews</li>
          </Link>
          <Link to={this.bookingsLink}>
            <li>Bookings</li>
          </Link>
        </ul>
      </div>
    );
  }
}

export default ResortNavTabs;
