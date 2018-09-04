// @flow

import React, { Component } from "react";
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Prismic from "prismic-javascript";
import { injectGlobal, ThemeProvider } from "styled-components";
import { globalStyles } from "Styles/global";
import { theme } from "Styles/themes";

import Homepage from "./Views/Homepage";
import logo from "./logo.svg";

injectGlobal`
	${globalStyles}
`;

const apiEndpoint = "https://pussypedia.prismic.io/api/v2";

class App extends Component {
  state = {
    home: [],
    articles: [],
    posts: []
  };
  //
  // addData = items => {
  //   const homePage = items.filter(i => i.type === "home");
  //   const postItems = items.filter(i => i.type === "post");
  //   const articleItems = items.filter(i => i.type === "article");
  //
  //   const home = [...this.state.home];
  //   const articles = [...this.state.articles];
  //   const posts = [...this.state.posts];
  //
  //   homePage.map(h => {
  //     home.push(h);
  //   });
  //
  //   articleItems.map(a => {
  //     articles.push(a);
  //   });
  //
  //   postItems.map(p => {
  //     posts.push(p);
  //   });
  //
  //   posts.push(postItems);
  //
  //   this.setState({
  //     home,
  //     articles,
  //     posts
  //   });
  // };

  componentDidMount() {
    Prismic.api(apiEndpoint).then(api => {
      // console.log('inside of prismic api')
      api
        .query("", {
          pageSize: 100
        })
        .then(response => {
          // console.log(response.results);
          // this.addData(response.results);
        });
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          {/* <Navigation /> */}
          <Switch>
            <Route path="/" exact component={Homepage} />
            {/* <Route path="/topics" exact component={Topics} /> */}

            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
