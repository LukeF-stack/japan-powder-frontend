import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { backendUrl } from "./App.jsx";

class DestinationResorts extends React.Component {
  list = [];
  componentDidMount() {
    this.getResorts();
  }
  getResorts = async (props) => {
    try {
      const url = new URL(`${backendUrl}/api/resorts`);
      const params = { destinationId: this.props.match.params.id };
      url.search = new URLSearchParams(params).toString();
      const response = await fetch(url);
      const resorts = await response.json();
      //console.log(resorts);
      this.setState({ results: resorts });
      //console.log(this.state.results);
      this.state.results.forEach((resort) => {
        this.list.push(
          <li key={resort._id} className="resort-li">
            <Link to={`/resorts/${resort._id}/info`}>
              <h5>{resort.title.toUpperCase()}</h5>
              <div
                className="resort-result"
                style={{ backgroundImage: `url(${resort.cover_img})` }}
              >
                {/* <img src={resort.cover_img} alt={resort.title}></img> */}
              </div>
            </Link>
          </li>
        );
        this.setState({ list: this.list });
      });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <div className="destination-resorts">
        <h1 className="section-title">Resorts</h1>
        <ul className="resorts-results">{this.list}</ul>
      </div>
    );
  }
}

export default DestinationResorts;
