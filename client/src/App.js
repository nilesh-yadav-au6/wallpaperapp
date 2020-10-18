import React, {useEffect} from "react";
import "../src/styles.css";
import NavBar from "../src/components/NavBar/NavBar";
import { Route, Switch ,Redirect } from "react-router-dom";
import { connect } from "react-redux"
import { authUser } from "./redux/actions/userAction"
import Login from "./components/SignIn/Login";
import SingUp from "./components/SignUp/SignUp";
import Dashbaord from "./components/UserDashboard/Home";
import Home from "./components/HomePage/HomePage";
import Favourites from "./components/UserDashboard/Favourites"

function App(props) {

  useEffect(() => {
      props.authUser()
  },[])

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/register" component={SingUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        {
          props.token !== null ?
          <>
          <Route exact path="/home" component={Dashbaord} />
          <Route exact path="/favourites" component={Favourites} />
          </> :null
        }
      <Redirect to="/" />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps , { authUser })(App)
