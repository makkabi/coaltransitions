import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

import { colors, mixins, mq } from '../../../token';

export default css`
  .strategy {
    display: flex;
    flex-direction: row;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
    position: relative;
  }

  @media ${mq.tablet} {
    .strategy {
      padding-bottom: 1.75rem;
      padding-top: 1.75rem;
    }
  }

  .title {
    margin-bottom: 0.75rem;
    margin-top: 0;
  }

  @media ${mq.tablet} {
    .title {
      margin-bottom: 1.25rem;
    }
  }

  .subtitle {
    margin: -1rem 0 1rem;
    ${mixins.text('regular')};
  }

  .cover-image-container {
    align-self: flex-start;
    border: 1px solid ${colors.greyLight};
    font-size: 0;
    flex: 0 0 auto;
    margin-right: 1rem;
    position: relative;
    width: 25%;
  }

  .cover-image-container:empty {
    border-color: transparent;
  }

  @media ${mq.tablet} {
    .cover-image-container {
      margin-right: 1.5rem;
      width: 20%;
    }
  }

  @media ${mq.desktop} {
    .cover-image-container {
      width: 15%;
    }
  }

  .cover-image img {
    max-width: 100%;
  }

  .content-container {
    display: flex;
    flex-direction: column;
  }

  .author-container {
    margin-bottom: 0.75rem;
  }

  @media ${mq.tabket} {
    .author-container {
      margin-bottom: 1.25rem;
    }
  }

  .tags-container {
    justify-self: flex-end;
    margin-top: auto;
  }
`;

export const linkTitle = css.resolve`
  a {
    ${mixins.text('regular-big')};

    display: inline-block;
    text-decoration: none;
  }

  @media ${mq.tablet} {
    a {
      ${mixins.text('regular-big', 'tablet')};
    }
  }

  @media ${mq.desktop} {
    a {
      ${mixins.text('regular-big', 'desktop')};
    }
  }

  a:hover,
  a:focus {
    color: ${colors.blueAction};
    text-decoration: underline;
  }
`;
