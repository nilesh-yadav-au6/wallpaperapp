import React, { Component } from "react";
import pic from "../../images/image.png";
import style from "./HomePage.module.css";

class HomePage extends Component {
  render() {
    return (
      <div className={style.home}>
        <img src={pic} alt="langingimage" />
      </div>
    );
  }
}

export default HomePage;
