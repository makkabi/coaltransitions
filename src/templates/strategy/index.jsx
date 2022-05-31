import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React, { Fragment } from 'react';

import AuthorList from '../../components/author-list';
import Button from '../../components/button';
import Constraint from '../../components/constraint';
import DownloadIcon from '../../../static/icons/download.svg';

import Richtext from '../../components/richtext';
import style, { buttonIcon } from './style';
import TagList from '../../components/tag-list';
import withLayout from '../../components/with-layout';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../../components/figure';
import { captionStyle } from '../../components/findings-list/finding/style';
import Picture from '../../components/picture';

const Page = ({
  data: {
    strategy: {
      title,
      featuredImage,
      acf: { content, additionalContent, additionalLinks = [] },
    },
  },
}) => {
  const image = getImage(featuredImage?.node?.localFile);
  return (
    <Constraint superwide>
      <Helmet title={title} />

      <article className="strategy">
        <style jsx>{style}</style>

        <header className="header">
          <h1 className="title">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h1>

          <div className="title-meta-container"></div>

          {featuredImage?.node?.localFile && (
            <div className="cover-image-container">
              {image && (
                <Figure
                  altText={featuredImage.altText}
                  image={image}
                  caption={featuredImage.caption}
                  captionClassName={captionStyle.className}
                />
              )}
            </div>
          )}
        </header>

        <div className="body">
          {content && (
            <div className="description">
              {content.map(({ __typename, ...block }) => {
                switch (__typename) {
                  case 'WpStrategy_Acf_Content_Text':
                    return <Richtext content={block.text} />;

                  case 'WpStrategy_Acf_Content_Image':
                    const image = getImage(block?.image?.localFile);

                    return image ? (
                      <Figure
                        altText={block.image.altText}
                        image={image}
                        caption={block.image.caption}
                        captionClassName={captionStyle.className}
                      />
                    ) : null;

                  default:
                    return <p>Block not implemented</p>;
                }
              })}
            </div>
          )}

          {additionalContent && (
            <div className="description">
              {additionalContent.map(({ __typename, ...block }) => {
                switch (__typename) {
                  case 'WpStrategy_Acf_AdditionalContent_Text':
                    return <Richtext content={block.text} />;

                  case 'WpStrategy_Acf_AdditionalContent_Image':
                    const image = getImage(block?.image?.localFile);

                    return image ? (
                      <Figure
                        altText={block.image.altText}
                        image={image}
                        caption={block.image.caption}
                        captionClassName={captionStyle.className}
                      />
                    ) : null;

                  default:
                    return <p>Block not implemented</p>;
                }
              })}
            </div>
          )}
        </div>

        <div className="meta"></div>
      </article>
    </Constraint>
  );
};

export default withLayout(Page);

export const query = graphql`
  query ($databaseId: Int) {
    strategy: wpStrategy(databaseId: { eq: $databaseId }) {
      title
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(width: 300, placeholder: BLURRED)
            }
          }
        }
      }
      acf {
        additionalLinks {
          link
          linktext
        }
        content {
          __typename
          ... on WpStrategy_Acf_Content_Text {
            text
          }
          ... on WpStrategy_Acf_Content_Image {
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
        additionalContent {
          __typename
          ... on WpStrategy_Acf_AdditionalContent_Text {
            text
          }
          ... on WpStrategy_Acf_AdditionalContent_Image {
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
