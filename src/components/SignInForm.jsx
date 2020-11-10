import React from "react";
import "../App.css";

class SignInForm extends React.Component {
  state = {
    email: "",
    password: ""
  };
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state.email);
    this.props.onSignIn(this.state);
    this.setState({
      email: "",
      password: ""
    });
  };
  render() {
    return (
      <div className="form">
        <h1 className="page-title">SIGN IN</h1>
        <form action="">
          <input
            name="email"
            //type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={(e) => this.change(e)}
          />
          <input
            name="password"
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={(e) => this.change(e)}
          />
          <button onClick={(e) => this.onSubmit(e)}>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
