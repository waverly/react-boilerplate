import React, { Component } from "react";
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Prismic from "prismic-javascript";
import { linkResolver } from "Utils/prismic-configuration";
import { RichText, Date } from "prismic-reactjs";

import Home from "Views/Home";
import logo from "./logo.svg";
import "./App.css";

const apiEndpoint = "https://wav-experiments.prismic.io/api/v2";

class App extends Component {
  state = {
    home: [],
    posts: []
  };
  addData = items => {
    const homePage = items.filter(i => i.type === "home");
    const postItems = items.filter(i => i.type === "post");

    const home = [...this.state.home];
    const posts = [...this.state.posts];

    home.push(homePage);

    this.setState({
      home: homePage,
      posts: postItems
    });
  };

  componentDidMount() {
    Prismic.api(apiEndpoint).then(api => {
      // console.log('inside of prismic api')
      api
        .query("", {
          pageSize: 100
        })
        .then(response => {
          this.addData(response.results);
        });
    });
  }
  render() {
    if (this.state.home.length > 0) {
      console.log(this.state.home[0].data.richtext);
      return (
        <div className="App">
          <div className="content-test">
            {RichText.render(this.state.home[0].data.richtext, linkResolver)}
          </div>
          <Route exact path="/" render={props => <Home {...props} />} />
        </div>
      );
    } else {
      return " ";
    }
  }
}

export default App;
