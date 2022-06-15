import classnames from 'classnames';
import Link from 'gatsby-link';
import React, { useMemo } from 'react';
import { graphql } from 'gatsby';

import ArrowIcon from '../../../../static/icons/arrow-alt-right.svg';
import Button from '../../button';

import style, { titleLink, imageLink, arrowIcon, captionStyle } from './style';

import Stroke1Green from '../../../../static/strokes/stroke-1-green.svg';
import Stroke1Blue from '../../../../static/strokes/stroke-1-blue.svg';

import Stroke2Green from '../../../../static/strokes/stroke-2-green.svg';
import Stroke2Blue from '../../../../static/strokes/stroke-2-blue.svg';

import Stroke3Green from '../../../../static/strokes/stroke-3-green.svg';
import Stroke3Blue from '../../../../static/strokes/stroke-3-blue.svg';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../../figure';
const STROKES = [
  [Stroke1Blue, Stroke1Green],
  [Stroke2Blue, Stroke2Green],
  [Stroke3Blue, Stroke3Green],
];

export default ({
  slug,
  title,
  featuredImage,
  acf: { intro },
  indexTitle,
  theme = 'blue',
  buttonLabel = 'Read more',
  buttonLabelAria = 'Read more about this finding',
  fullsizeImage = false,
}) => {
  const url = `/tools/coping-strategies/${slug ? `${slug}/` : ''}`;

  const strokesIndex = useMemo(
    () => Math.floor(Math.random() * STROKES.length),
    []
  );

  const [Stroke1, Stroke2] = STROKES[strokesIndex];

  const image = getImage(featuredImage.localFile);

  return (
    <section
      className={classnames(
        'argument',
        {
          'argument--has-theme-green': theme === 'green',
        },
        { 'argument--has-fullsize-image': fullsizeImage }
      )}
    >
      <style jsx>{style}</style>
      {titleLink.styles}
      {imageLink.styles}
      {arrowIcon.styles}
      {captionStyle.styles}

      <div className="image-container">
        <Link to={url} className={imageLink.className} rel="nofollow">
          {image && (
            <Figure
              altText={featuredImage.altText}
              image={image}
              caption={featuredImage.caption}
              captionClassName={captionStyle.className}
            />
          )}
        </Link>
      </div>

      <div className="intro-container">
        <h2 className="title">
          <Link to={url} rel="nofollow" className={titleLink.className}>
            {indexTitle && <span className="index">{indexTitle}</span>}
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </h2>

        {intro && (
          <div className="intro" dangerouslySetInnerHTML={{ __html: intro }} />
        )}

        <Button to={url} aria-label={buttonLabelAria} rel="nofollow">
          {buttonLabel}
          <ArrowIcon className={arrowIcon.className} />
        </Button>
      </div>

      <div className="background-strokes-container">
        <Stroke1 />
        <Stroke2 />
      </div>
    </section>
  );
};

export const fragment = graphql`
  fragment strategyCategoryListItem on WpStrategyCategory {
    slug
    title
    featuredImage {
      node {
        caption
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
          }
        }
      }
    }
    acf {
      intro
      strategyNumber
      strategyLabel
    }
  }
`;
