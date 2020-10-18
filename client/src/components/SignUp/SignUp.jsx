import React, { Component } from "react";
import { connect } from "react-redux";
import { userCreate } from "../../redux/actions/userAction";
import style from "../SignUp/SignUp.module.css";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validate = () => {
    let errorEmail = "";
    let errorPassword = "";
    let errorfname = "";
    let errorlname = "";

    if (
      !this.state.fname ||
      !this.state.lname ||
      !this.state.password ||
      !this.state.email.includes("@")
    ) {
      if (!this.state.fname) {
        errorfname = "First Name can not be empty";
        if (errorfname) {
          this.setState({ errorfname });
        }
        return false;
      }

      if (!this.state.lname) {
        errorlname = "Lirst Name can not be empty";
        if (errorlname) {
          this.setState({ errorlname });
        }
        return false;
      }

      if (!this.state.password) {
        errorPassword = "Lirst Name can not be empty";
        if (errorPassword) {
          this.setState({ errorPassword });
        }
        return false;
      }

      if (!this.state.email.includes("@")) {
        errorEmail = "Invalid Email";
        if (errorEmail) {
          this.setState({ errorEmail });
        }
        return false;
      }
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    };
    this.props.userCreate(newUser);
    // this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit} className={style.mainDiv}>
          <input
            className={style.inDiv}
            type="text"
            name="name"
            value={this.state.name}
            placeholder="First Name"
            onChange={this.handleChange}
          />
          <input
            className={style.inDiv}
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.handleChange}
          />
          <input
            className={style.inDiv}
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter Password"
            onChange={this.handleChange}
          />
          <input className={style.btDiv} type="submit" value="Sing Up" />
        </form>
      </div>
    );
  }
}

export default connect(null, { userCreate })(SignUp);
