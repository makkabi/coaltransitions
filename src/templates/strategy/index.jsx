import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';

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

const Page = ({
  data: {
    strategy: {
      title,
      featuredImage,
      actorTags: { nodes: actorTags },
      strategyTags: { nodes: strategyTags },
      acf: { subtitle, content, additionalContent, relatedStrategies },
    },
  },
}) => {
  const image = getImage(featuredImage?.node?.localFile);

  return (
    <Constraint superwide>
      <Helmet title={title} />

      <article className="strategy">
        <style jsx>{style}</style>
        <div className="left-column">
          <header className="header">
            <h1 className="title">
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </h1>

            <div className="title-meta-container">
              {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>

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
          {relatedStrategies?.length && (
            <section>
              <h3 className="meta-block-title">Related Strategies</h3>
              <ul>
                {relatedStrategies
                  .filter((item) => item?.strategy)
                  .map(({ strategy: { uri, title } }) => (
                    <li key={uri}>
                      <a href={uri}>{title}</a>
                    </li>
                  ))}
              </ul>
            </section>
          )}
        </div>
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

        <div className="meta">
          {strategyTags && (
            <div className="meta-block">
              <h3 className="meta-block-title">Keywords</h3>

              <div>
                <TagList
                  tags={strategyTags}
                  filterUrl="/tools-resist/strategies?keyword="
                  filterName="strategyTag"
                />
              </div>
            </div>
          )}

          {actorTags && (
            <div className="meta-block">
              <h3 className="meta-block-title">Actors</h3>

              <div>
                <TagList
                  tags={actorTags}
                  filterUrl="/tools-resist/strategies?actor="
                  filterName="actor"
                />
              </div>
            </div>
          )}
        </div>
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
      strategyTags {
        nodes {
          name
          slug
        }
      }
      actorTags {
        nodes {
          name
          slug
        }
      }
      acf {
        subtitle
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
        relatedStrategies {
          strategy {
            ... on WpStrategy {
              uri
              title
            }
          }
        }
      }
    }
  }
`;
