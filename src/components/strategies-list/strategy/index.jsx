import Link from 'gatsby-link';
import React from 'react';
import { graphql } from 'gatsby';

import style, { linkTitle } from './style';
import TagList from '../../tag-list';
import Figure from '../../figure';
import { captionStyle } from '../../findings-list/finding/style';
import { getImage } from 'gatsby-plugin-image';

export const fragment = graphql`
  fragment strategyListItem on WpStrategy {
    slug
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
    actorTags {
      nodes {
        slug
        name
      }
    }
    strategyTags {
      nodes {
        slug
        name
      }
    }
  }
`;

export default ({
  actorTags: { nodes: actorTags },
  strategyTags: { nodes: strategyTags },
  title,
  featuredImage,
  url,
  onFilter,
}) => {
  const image = getImage(featuredImage?.node?.localFile);

  return (
    <div className="strategy">
      <style jsx>{style}</style>
      {linkTitle.styles}

      <div className="cover-image-container">
        {featuredImage?.node?.localFile && (
          <Link to={url} rel="nofollow">
            {image && (
              <Figure
                altText={featuredImage.altText}
                image={image}
                caption={featuredImage.caption}
                captionClassName={captionStyle.className}
              />
            )}
          </Link>
        )}
      </div>

      <div className="content-container">
        <h2 className="title">
          <Link to={url} className={linkTitle.className}>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </h2>

        {strategyTags && (
          <div className="tags-container">
            <TagList
              tags={strategyTags}
              filterUrl="/tools-resist/strategies?keyword="
              filterName="strategyTag"
              onFilter={onFilter}
            />
          </div>
        )}

        {actorTags && (
          <div className="tags-container">
            <TagList
              tags={actorTags}
              filterUrl="/tools-resist/strategies?actor="
              filterName="actor"
              onFilter={onFilter}
            />
          </div>
        )}
      </div>
    </div>
  );
};
