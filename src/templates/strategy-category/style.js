import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

import { colors, mixins, mq } from '../../token';

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

  .body {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media ${mq.tablet} {
    .body {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  @media ${mq.desktop} {
    .body {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .description {
    margin-bottom: 3rem;
  }

  @media ${mq.tablet} {
    .description {
      margin-bottom: 5rem;
    }
  }

  @media ${mq.desktop} {
    .description {
      margin-bottom: 6rem;
    }
  }

  @media ${mq.tablet} {
    .section-headline {
      ${mixins.text('regular-big', 'tablet')};
    }
  }

  @media ${mq.desktop} {
    .section-headline {
      ${mixins.text('regular-big', 'desktop')};
    }
  }
`;

export const featuredImage = css.resolve`
  height: auto;
  width: 100%;
`;
