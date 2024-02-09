import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

import { mixins, colors, mq } from '../../token';

export default css`
  .header {
    margin-bottom: 1.5rem;
    width: 100%;
  }

  @media ${mq.tablet} {
    margin-bottom: 4.5rem;
  }

  .title {
    ${mixins.text('huge')}

    align-self: flex-end;
    background-color: ${colors.blueBrand};
    color: white;
    margin-bottom: -2.5rem;
    margin-left: auto;
    margin-top: 0;
    padding: 1rem;
    position: relative;
    width: 90%;
    z-index: 10;
  }

  @media ${mq.tablet} {
    .title {
      ${mixins.text('huge', 'tablet')}

      padding: 1.5rem 5rem 1.5rem 1.5rem;
      width: 75%;
    }
  }

  @media ${mq.desktop} {
    .title {
      ${mixins.text('huge', 'desktop')}

      padding: 1.5rem 15rem 1.5rem 2.5rem;
    }
  }
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
`;

export const picture = css.resolve`
  figure {
    margin: 1rem 0;
  }

  @media ${mq.tablet} {
    figure {
      margin-bottom: 1.25rem;
      margin-top: 1.25rem;
    }
  }

  @media ${mq.desktop} {
    figure {
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
  }
`;
