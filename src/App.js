import React, { Component } from "react";
import { Switch, Route, HashRouter, Link } from "react-router-dom";

import Home from "Views/Home";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={props => <Home {...props} />} />
      </div>
    );
  }
}

export default App;
