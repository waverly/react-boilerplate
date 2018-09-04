// @flow

import React, { Component } from "react";
import Prismic from "prismic-javascript";
import styled from "styled-components";

const apiEndpoint = "https://pussypedia.prismic.io/api/v2";

class Homepage extends Component {
  state = {};

  componentDidMount() {
    Prismic.api(apiEndpoint).then(api => {
      // console.log('inside of prismic api')
      api
        .query(Prismic.Predicates.at("document.type", "home"))
        .then(response => {
          console.log("hi");
          console.log(response.results);
        });
    });
  }

  render() {
    return (
      <div>
        <h1>Henlo world</h1>
      </div>
    );
  }
}

export default Homepage;
