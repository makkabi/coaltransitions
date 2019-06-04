import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

import { mixins, colors, mq } from '../../token';

export default css`
  article {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
  }

  @media ${mq.tablet} {
    article {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  h1 {
    ${mixins.text('huge')}

    color: ${colors.blueBrand};
    margin-bottom: 1rem;
    margin-top: 0;
  }

  @media ${mq.tablet} {
    h1 {
      ${mixins.text('huge', 'tablet')}

      margin-bottom: 2rem;
    }
  }

  @media ${mq.desktop} {
    h1 {
      ${mixins.text('huge', 'desktop')}

      margin-bottom: 3rem;
    }
  }
`;

export const aboutPicture = css.resolve`
  img {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  @media ${mq.tablet} {
    img {
      margin-bottom: 1.25rem;
      margin-left: -4rem;
      margin-top: 1.25rem;
    }
  }

  @media ${mq.desktop} {
    img {
      margin-bottom: 2rem;
      margin-left: -20%;
      margin-top: 2rem;
    }
  }
`;
