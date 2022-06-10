import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';

import Constraint from '../../components/constraint';
import Intro from '../../components/intro';
import Picture from '../../components/picture';
import Richtext from '../../components/richtext';
import withLayout from '../../components/with-layout';

import style, { featuredImage as featuredImageStyle } from './style';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../../components/figure';
import { captionStyle } from '../../components/findings-list/finding/style';

const Page = ({
  data: {
    finding: {
      title,
      featuredImage,
      acf: { intro, content },
    },
  },
}) => {
  const image = getImage(featuredImage?.node?.localFile);

  return (
    <Fragment>
      <style jsx>{style}</style>
      {featuredImageStyle.styles}
      <Helmet title={title} />

      <header className="header">
        <h1 className="title" dangerouslySetInnerHTML={{ __html: title }} />

        {image && (
          <Figure
            altText={featuredImage.altText}
            image={image}
            caption={featuredImage.caption}
            captionClassName={captionStyle.className}
          />
        )}
      </header>

      <Constraint topLevel>
        <div className="body">
          <Intro intro={intro} />

          {content && (
            <div className="description">
              {content.map(({ __typename, ...block }) => {
                switch (__typename) {
                  case 'WpStrategyCategory_Acf_Content_Text':
                    return <Richtext content={block.text} />;

                  case 'WpStrategyCategory_Acf_Content_Image':
                    const image = getImage(block?.image.localFile);

                    if (!image) {
                      return null;
                    }
                    return (
                      <Figure
                        altText={block.image.altText}
                        image={image}
                        caption={block.image.caption}
                        captionClassName={captionStyle.className}
                      />
                    );

                  default:
                    return <p>Block not implemented</p>;
                }
              })}
            </div>
          )}
        </div>
      </Constraint>
    </Fragment>
  );
};

export default withLayout(Page);

export const query = graphql`
  query ($databaseId: Int) {
    finding: wpStrategyCategory(databaseId: { eq: $databaseId }) {
      title
      featuredImage {
        node {
          caption
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
        }
      }
      acf {
        intro
        content {
          __typename
          ... on WpStrategyCategory_Acf_Content_Text {
            text
          }
          ... on WpStrategyCategory_Acf_Content_Image {
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
  }
`;
