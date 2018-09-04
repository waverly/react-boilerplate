import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { linkResolver } from "Utils/prismic-configuration";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { RichText, Date } from "prismic-reactjs";

const PageWrap = styled.div`
  text-align: left;
  padding: 20px;

  img {
    max-width: 100%;
  }
`;

const InlineWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .block-img {
    display: inline-block;
    max-width: 200px;
    float: right;
    margin: 20px;
    img {
      max-width: 100%;
    }
  }

  .sidebar {
    display: inline-block;
    max-width: 200px;
    float: right;
    margin: 20px;
    background-color: grey;
    padding: 20px;
    img {
      max-width: 100%;
    }
  }

  img {
    max-width: 400px;
  }
`;

const SideBar = styled.div`
  display: inline-block;
  max-width: 200px;
  float: right;
  margin: 20px;
  background-color: grey;
  padding: 20px;
`;

class Article extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    const uid = params.articleUid;
    console.log(uid);
  }

  render() {
    if (this.props.articles) {
      const { match: { params } } = this.props;
      const uid = params.articleUid;
      const data = this.props.articles.filter(i => i.uid === uid);
      const { billboard, body, resource, title } = data[0].data;

      const apiEndpoint = "https://wav-experiments.prismic.io/api/v2";

      Prismic.api(apiEndpoint).then(api => {
        api
          .getByUID("article", "article", { fetchLinks: "post.title" })
          .then(function(document) {
            var cr = document.data.resource[0].content_relationship;
            // the variable author now works like a top-level document
            var crdata = cr.data;
            console.log(cr);
            console.log(crdata);
          });
      });

      return (
        <PageWrap>
          <img src={billboard.url} alt="" />
          <h1>{title[0].text}</h1>
          <br />
          <br />
          {body.map(slice => {
            let richtext;
            let inlineImg;
            let sidebar;
            let fullImg;

            const type = slice.slice_type;

            if (slice.primary.richtext) {
              richtext = slice.primary.richtext;
            }

            if (slice.primary.inline_image) {
              inlineImg = slice.primary.inline_image.url;
            }

            if (slice.primary.sidebar) {
              console.log("slice has sidebar");
              sidebar = slice.primary.sidebar;
            }

            if (slice.primary.image) {
              console.log("slice has img");
              fullImg = slice.primary.image.url;
            }

            console.log(type);
            //
            if (type === "sidebar") {
              console.log("ONLY SIDEBAR");
              return (
                <SideBar>
                  <h1>floated sidebar</h1>
                </SideBar>
              );
            }

            if (richtext && !inlineImg && !sidebar) {
              return (
                <InlineWrap>
                  {RichText.render(richtext, linkResolver)}
                </InlineWrap>
              );
            }

            if (richtext && inlineImg) {
              console.log("should render");
              return (
                <InlineWrap>
                  {RichText.render(richtext, linkResolver)}
                  <img src={inlineImg} alt="" />
                </InlineWrap>
              );
            }

            if (richtext && sidebar) {
              return (
                <InlineWrap>
                  {RichText.render(richtext, linkResolver)}
                  <div className="sidebar">
                    {RichText.render(sidebar, linkResolver)}
                  </div>
                </InlineWrap>
              );
            }

            if (fullImg) {
              return <img src={fullImg} alt="" />;
            }
          })}
        </PageWrap>
      );
    } else {
      return " ";
    }
  }
}

export default Article;
