import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';

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

const HUMAN_READABLE_LANGUAGES = {
  en: 'English',
  de: 'German',
};

const Page = ({
  data: {
    strategy: { title },
  },
}) => {
  // const image = getImage(featuredImage?.node?.localFile);
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

          {/*          {featuredImage?.node?.localFile && (
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
          )}*/}
        </header>

        <div className="body"></div>

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
    }
  }
`;
