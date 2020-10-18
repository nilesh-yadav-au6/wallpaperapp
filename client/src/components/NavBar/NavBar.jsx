import React, { Component } from "react";
import style from "../NavBar/NavBar.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  logoutUser = () => {
    this.props.logout();
  };

  render() {
    return (
      <div className={style.navBar}>
        {this.props.user === null ? (
          <div className={style.mainHeader}>
            <Link to="/" style={{ textDecoration: "none" }}>
              ImageGallery
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Sign In
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        ) : (
          <div className={style.mainHeader}>
            <Link to="/" style={{ textDecoration: "none" }}>
              ImageGallery
            </Link>
            <Link to="/home" style={{ textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/favourites" style={{ textDecoration: "none" }}>
              Favourite
            </Link>
            <Link
              to="/"
              onClick={this.props.logout}
              style={{ textDecoration: "none" }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateProp = (state) => {
  return {
    user: state.user.user,
  };
};

export default withRouter(connect(mapStateProp, { logout })(NavBar));
