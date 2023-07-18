import { graphql } from 'gatsby';
import React from 'react';

import BlockSwitch from '../BlockSwitch';
import Constraint from '../constraint';
import Intro from '../intro';

import style from './style';

export const fragment = graphql`
  fragment NewsEntry on WpNewsEntry {
    date(formatString: "DD. MMMM YYYY")
    title
    acf {
      intro
      customdate
      content {
        ... on WpNewsEntry_Acf_Content_Text {
          __typename
          text
        }
        ... on WpNewsEntry_Acf_Content_Partner {
          __typename
          name
          summary
          link
          logo {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
        ... on WpNewsEntry_Acf_Content_Image {
          __typename
          image {
            altText
            caption
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  }
`;

const News = ({ title, date, acf: { intro, content, customdate } }) => (
  <article>
    <style jsx>{style}</style>
    <Constraint topLevel>
      <h1 className="title">
        <small className="date">{customdate ?? date}</small>
        <span className="title-text">{title}</span>
      </h1>

      <Intro intro={intro} />

      <BlockSwitch blocks={content} typePrefix="WpNewsEntry_Acf_Content_" />
    </Constraint>
  </article>
);

export default News;
