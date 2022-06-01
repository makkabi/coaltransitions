import Link from 'gatsby-link';
import React from 'react';
import { graphql } from 'gatsby';

import AuthorList from '../../author-list';
import style, { linkTitle, linkPicture } from './style';
import TagList from '../../tag-list';
import Figure from '../../figure';
import { captionStyle } from '../../findings-list/finding/style';
import { getImage } from 'gatsby-plugin-image';

export const fragment = graphql`
  fragment publicationListItem on WpPublication {
    slug
    title
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(width: 400, placeholder: BLURRED)
          }
        }
      }
    }
    tags {
      nodes {
        slug
        name
      }
    }
    acf {
      author {
        name
      }
      year
    }
  }
`;

export default ({
  acf: { author, year },
  tags: { nodes: tags },
  title,
  featuredImage,
  url,
  onFilter,
}) => {
  const image = getImage(featuredImage?.node?.localFile);

  return (
    <div className="publication">
      <style jsx>{style}</style>
      {linkTitle.styles}
      {linkPicture.styles}

      <div className="cover-image-container">
        <p className="year">{year}</p>

        {featuredImage?.node?.localFile && (
          <Link to={url} className={linkPicture.className} rel="nofollow">
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

        {author && (
          <div className="author-container">
            <AuthorList authors={author} onFilter={onFilter} trim={5} />
          </div>
        )}

        {tags && (
          <div className="tags-container">
            <TagList
              onFilter={onFilter}
              tags={tags}
              filterUrl="/publications/?keywords="
              filterName="tags"
            />
          </div>
        )}
      </div>
    </div>
  );
};
