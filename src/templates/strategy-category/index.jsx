import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';

import Constraint from '../../components/constraint';
import Intro from '../../components/intro';
import Richtext from '../../components/richtext';
import withLayout from '../../components/with-layout';

import style, { featuredImage as featuredImageStyle } from './style';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../../components/figure';
import { captionStyle } from '../../components/findings-list/finding/style';
import Partner from '../../components/partner';
import Newsletter from '../../components/Newsletter';
import StrategiesList from '../../components/strategies-list';

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
              {content.map(({ __typename, ...block }, index) => {
                switch (__typename) {
                  case 'WpStrategyCategory_Acf_Content_Text':
                    return <Richtext content={block.text} key={index} />;

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
                        key={index}
                      />
                    );

                  case 'WpStrategyCategory_Acf_Content_Partner':
                    return <Partner {...block} key={index} />;

                  case 'WpStrategyCategory_Acf_Content_Newsletter':
                    return <Newsletter {...block} key={index} />;

                  case 'WpStrategyCategory_Acf_Content_RelatedStrategies':
                    return (
                      block?.relatedStrategies?.length && (
                        <StrategiesList
                          title={`Strategies (${block?.relatedStrategies.length})`}
                          strategies={block?.relatedStrategies.map(
                            ({ strategy }) => strategy
                          )}
                          onFilter={false}
                        />
                      )
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
          ... on WpStrategyCategory_Acf_Content_Partner {
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
          ... on WpStrategyCategory_Acf_Content_Newsletter {
            title
            intro
            link
            linklabel
          }

          ... on WpStrategyCategory_Acf_Content_RelatedStrategies {
            relatedStrategies {
              strategy {
                ...strategyListItem
              }
            }
          }
        }
      }
    }
  }
`;
