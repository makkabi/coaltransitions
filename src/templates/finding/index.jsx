import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';

import Constraint from '../../components/constraint';
import Intro from '../../components/intro';
import MoreLinksList from '../../components/more-links-list';
import Picture from '../../components/picture';
import PublicationList from '../../components/publication-list';
import Richtext from '../../components/richtext';
import withLayout from '../../components/with-layout';

import style, { featuredImage as featuredImageStyle } from './style';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../../components/figure';
import { captionStyle } from '../../components/findings-list/finding/style';

const Page = ({
  data: {
    publications: { nodes: publications },
    finding: {
      title,
      featuredImage,
      acf: { intro, content, additionalLinks = [] },
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
                  case 'WpFinding_Acf_Content_Text':
                    return <Richtext content={block.text} />;

                  case 'WpFinding_Acf_Content_Image':
                    return (
                      <Picture
                        image={block.image.localFile}
                        caption={block.image.caption}
                      />
                    );

                  default:
                    return <p>Block not implemented</p>;
                }
              })}
            </div>
          )}

          {additionalLinks && additionalLinks.length > 0 && (
            <div className="additional-links-container">
              <h3 className="section-headline">Further reading</h3>
              <MoreLinksList items={additionalLinks} />
            </div>
          )}

          {publications && publications.length > 0 && (
            <div className="publications-list-contaioner">
              <PublicationList
                publications={publications}
                title="Related Publications"
              />
            </div>
          )}
        </div>
      </Constraint>
    </Fragment>
  );
};

export default withLayout(Page);

export const query = graphql`
  query ($databaseId: Int, $relatedPublications: [Int!]) {
    publications: allWpPublication(
      filter: { databaseId: { in: $relatedPublications } }
    ) {
      nodes {
        ...publicationListItem
      }
    }
    finding: wpFinding(databaseId: { eq: $databaseId }) {
      title
      featuredImage {
        node {
          caption
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 600
                placeholder: BLURRED
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      acf {
        intro
        additionalLinks {
          link
          linktext
        }
        content {
          __typename
          ... on WpFinding_Acf_Content_Text {
            text
          }
          ... on WpFinding_Acf_Content_Image {
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
