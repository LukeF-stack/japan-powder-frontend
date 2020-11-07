import React from "react";
import "../App.css";
import SignUpForm from "../components/SignUpForm";
import { withRouter } from "react-router-dom";
import { backendUrl } from "../components/App.jsx";

class SignUpPage extends React.Component {
  redirectToHome = () => {
    const { history } = this.props;
    if (history) history.push("/signin");
  };
  onSignUp = async (fields) => {
    //console.log("signupPage got", fields);

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fields)
    };
    try {
      const response = await fetch(`${backendUrl}/api/users`, settings);
      const data = await response.json();
      console.log(`${data.fullName} user created`);
    } catch (e) {
      console.log(e.message);
    }
    this.redirectToHome();
  };

  render() {
    return (
      <div>
        <SignUpForm onSignUp={(fields) => this.onSignUp(fields)} />
      </div>
    );
  }
}

export default withRouter(SignUpPage);
