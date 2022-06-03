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
import Newsletter from '../../components/Newsletter';

const Page = ({
  data: {
    strategy: {
      title,
      featuredImage,
      actorTags: { nodes: actorTags },
      strategyTags: { nodes: strategyTags },
      acf: {
        subtitle,
        content,
        additionalContent,
        relatedStrategies,
        exampleStrategies,
        actions,
      },
    },
    wp: {
      themeGeneralSettings: { themeGeneralSettings },
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

            {subtitle && <p className="subtitle">{subtitle}</p>}

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

          {themeGeneralSettings.spreadsheetUrl && (
            <Button
              to={themeGeneralSettings.spreadsheetUrl}
              download
              theme="blue"
            >
              Download Spreadsheet&nbsp;
              <DownloadIcon className={buttonIcon.className} />
            </Button>
          )}

          {relatedStrategies?.length && (
            <section className="related-strategies related-strategies--related">
              <h2 className="meta-block-title">Related Strategies</h2>
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
              {content.map(({ __typename, ...block }, index) => {
                switch (__typename) {
                  case 'WpStrategy_Acf_Content_Text':
                    return <Richtext content={block.text} key={index} />;

                  case 'WpStrategy_Acf_Content_Image':
                    const image = getImage(block?.image?.localFile);

                    return image ? (
                      <Figure
                        altText={block.image.altText}
                        image={image}
                        caption={block.image.caption}
                        captionClassName={captionStyle.className}
                        key={index}
                      />
                    ) : null;

                  case `WpStrategy_Acf_Content_Newsletter`:
                    return <Newsletter {...block} key={index} />;

                  default:
                    return <p key={index}>Block not implemented</p>;
                }
              })}
            </div>
          )}

          {themeGeneralSettings.strategiesInfobox && (
            <aside
              className="infobox"
              dangerouslySetInnerHTML={{
                __html: themeGeneralSettings.strategiesInfobox,
              }}
            />
          )}

          {exampleStrategies?.length && (
            <section className="related-strategies related-strategies--example">
              <h2>Regional Example Strategies</h2>
              <ul>
                {exampleStrategies
                  .filter((item) => item?.strategy)
                  .map(({ strategy: { uri, title } }) => (
                    <li key={uri}>
                      <a href={uri}>{title}</a>
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {additionalContent && (
            <div className="description">
              {additionalContent.map(({ __typename, ...block }, index) => {
                switch (__typename) {
                  case 'WpStrategy_Acf_AdditionalContent_Text':
                    return <Richtext content={block.text} key={index} />;

                  case 'WpStrategy_Acf_AdditionalContent_Image':
                    const image = getImage(block?.image?.localFile);

                    return image ? (
                      <Figure
                        altText={block.image.altText}
                        image={image}
                        caption={block.image.caption}
                        captionClassName={captionStyle.className}
                        key={index}
                      />
                    ) : null;

                  case `WpStrategy_Acf_AdditionalContent_Newsletter`:
                    return <Newsletter {...block} key={index} />;

                  default:
                    return <p key={index}>Block not implemented</p>;
                }
              })}
            </div>
          )}
        </div>

        <div className="meta">
          {strategyTags && (
            <section className="meta-block">
              <h2 className="meta-block-title">Keywords</h2>

              <div>
                <TagList
                  tags={strategyTags}
                  filterUrl="/tools-resist/strategies?keyword="
                  filterName="strategyTag"
                />
              </div>
            </section>
          )}

          {actorTags && (
            <section className="meta-block">
              <h2 className="meta-block-title">Actors</h2>

              <div>
                <TagList
                  tags={actorTags}
                  filterUrl="/tools-resist/strategies?actor="
                  filterName="actor"
                />
              </div>
            </section>
          )}

          {actions && (
            <section className="meta-block">
              <h2 className="meta-block-title">Actions</h2>
              <div dangerouslySetInnerHTML={{ __html: actions }} />
            </section>
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
          ... on WpStrategy_Acf_Content_Newsletter {
            title
            intro
            link
            linklabel
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
          ... on WpStrategy_Acf_AdditionalContent_Newsletter {
            title
            intro
            link
            linklabel
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

        exampleStrategies {
          strategy {
            ... on WpStrategy {
              uri
              title
            }
          }
        }
        actions
      }
    }
    wp {
      themeGeneralSettings {
        themeGeneralSettings {
          spreadsheetUrl
          strategiesInfobox
        }
      }
    }
  }
`;
