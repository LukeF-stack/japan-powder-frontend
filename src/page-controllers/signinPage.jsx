import React from "react";
import "../App.css";
import SignInForm from "../components/SignInForm";
//import { User } from "../components/User.js";
import SignInUser from "../components/SignInUser";

class SignInPage extends React.Component {
  setUser = [];
  onSignIn = async (fields) => {
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
      const response = await fetch(
        `https://dsbn3.sse.codesandbox.io/api/auth/login`,
        settings
      );
      const data = await response.json();
      //console.log(data);
      if (!data) {
        console.log("problem signing in");
      } else {
        //console.log(data.user);
        this.userData = data.user;
        this.User = this.userData;
        this.setUser.push(<SignInUser key="1" userData={this.User} />);
        this.setState(this.userData);
        localStorage.setItem("token", data.token);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    //const user = this.state;
    return (
      <div>
        <SignInForm onSignIn={(fields) => this.onSignIn(fields)} />
        <div>{this.setUser}</div>
      </div>
    );
  }
}

export default SignInPage;
