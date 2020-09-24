import { Helmet } from 'react-helmet';
import React from 'react';
import { graphql } from 'gatsby';

import Constraint from '../../components/constraint';
import Intro from '../../components/intro';
import MoreLinksList from '../../components/more-links-list';
import Picture from '../../components/picture';
import PublicationList from '../../components/publication-list';
import Richtext from '../../components/richtext';
import withLayout from '../../components/with-layout';

import style, { pictureStyle } from './style';

const findPublicationById = (id, publications) =>
  publications.find(({ wordpress_id: wordpressId }) => wordpressId === id);

const Page = ({
  data: {
    publications: { nodes: publications },
    finding: {
      title,
      featuredImage,
      acf: {
        intro,
        content,
        additional_links: additionalLinks = [],
        publications: additionalPublications
      }
    }
  }
}) => {
  const publicationListItems = additionalPublications.map(({ publicationId }) =>
    findPublicationById(publicationId, publications)
  );

  return (
    <>
      <style jsx>{style}</style>
      {pictureStyle.style}

      <Helmet title={title} />

      <header className="header">
        <h1 className="title" dangerouslySetInnerHTML={{ __html: title }} />

        {featuredImage && featuredImage.localFile && (
          <Picture
            image={featuredImage.localFile}
            caption={featuredImage.caption}
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
                  case 'WordPressAcf_text':
                    return <Richtext content={block.text} />;

                  case 'WordPressAcf_image':
                    return (
                      <figure className={pictureStyle.className}>
                        <Picture
                          image={block.image.localFile}
                          caption={block.image.caption}
                        />
                      </figure>
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

          {additionalPublications && (
            <div className="publications-list-contaioner">
              <PublicationList
                publications={publicationListItems}
                title="Related Publications"
              />
            </div>
          )}
        </div>
      </Constraint>
    </>
  );
};

export default withLayout(Page);

export const query = graphql`
  query($wordpressId: Int) {
    publications: allWordpressWpPublications {
      nodes {
        ...publicationListItem
      }
    }

    finding: wordpressWpFindings(wordpress_id: { eq: $wordpressId }) {
      title
      featuredImage: featured_media {
        caption
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              src
              srcSet
            }
          }
        }
      }
      acf {
        intro
        additional_links {
          link
          linktext
        }
        publications {
          publicationId: publication
        }
        content: content_findings {
          __typename

          ... on WordPressAcf_text {
            text
          }

          ... on WordPressAcf_image {
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    src
                    srcSet
                    srcWebp
                  }
                }
              }
              caption
            }
          }
        }
      }
    }
  }
`;
