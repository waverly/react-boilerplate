// @flow

import React, { Component } from "react";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import styled from "styled-components";

import {
  linkResolver,
  fetchArticle,
  fetchResource
} from "Utils/prismic-configuration";

const apiEndpoint = "https://pussypedia.prismic.io/api/v2";

class Homepage extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    Prismic.api(apiEndpoint).then(api => {
      // console.log('inside of prismic api')
      api
        .query(Prismic.Predicates.at("document.type", "home"), {
          fetchLinks: [
            "article.title",
            "article.subtitle",
            "article.hero_image",
            "article.module_type",
            "resource.title",
            "resource.subtitle",
            "resource.thumbnail"
          ]
        })
        .then(response => {
          console.log("hi");

          const slices = response.results[0].data.body;
          console.log(slices);

          // put data in an object and add object to state
          const parsedSlices = slices.map(d => {
            // parse data for necessary content

            switch (d.slice_type) {
              // if single article module
              case "article_module":
                // if it is an article_module, mine the content relationship
                const article = d.primary.article;
                return {
                  module_type: d.primary.module_type,
                  article: fetchArticle(article, "article")
                };

              // if recommended block
              case "recommended":
                const title = d.primary.title[0].text;
                const subtitle = d.primary.subtitle[0].text;
                const type = d.slice_type;
                const recommended_items = d.items.map(i => {
                  const article = i.recommended_item;
                  // console.log(article);
                  return {
                    module_type: d.module_type,
                    article: fetchArticle(article, "article")
                  };
                });
                return {
                  title,
                  subtitle,
                  recommended_items,
                  type
                };

              // if resource module
              case "resource_module":
                // if it is a resource_module, mine the content relationship
                const resource = d.primary.resource;
                return {
                  module_type: d.primary.module_type,
                  resource: fetchResource(resource, "resource")
                };
            }

            return;
          });

          // create a new "State" object without mutating
          // the original State object.
          const newState = Object.assign({}, this.state, {
            data: parsedSlices
          });

          // store the new state object in the component's state
          this.setState(newState);
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
