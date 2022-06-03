import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

import { colors, mixins, mq } from '../../token';

export default css`
  .strategy {
    padding-left: 1rem;
    padding-right: 1rem;
    display: grid;
    gap: 1.5rem;
  }

  @media ${mq.tablet} {
    .strategy {
      margin-top: 3rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  @media ${mq.desktop} {
    .strategy {
      grid-template-columns: 20% 1fr 20%;
    }
  }

  @media ${mq.tablet} {
    .left-column {
      padding-left: 1.5rem;
    }
  }

  @media ${mq.desktop} {
    .left-column {
      padding-left: 2.5rem;
    }
  }

  .title {
    ${mixins.text('extra-big')}

    margin-bottom: 1.5rem;
    margin-top: 0;
    order: 1;
    width: 100%;
  }

  @media ${mq.tablet} {
    .title {
      ${mixins.text('extra-big', 'tablet')}

      margin-bottom: 1.5rem;
      order: 1;
    }
  }

  @media ${mq.desktop} {
    .title {
      ${mixins.text('extra-big', 'desktop')}
    }
    .header {
    }

    .left-column {
      display: grid;
      justify-items: end;
    }

    .left-column * {
      text-align: right;
    }
  }

  .subtitle {
    color: ${colors.blueBrand};
    ${mixins.text('medium', 'desktop')}
    display: block;
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 0;
    order: 2;
  }

  .header {
    margin-bottom: 1.5rem;
  }

  .related-strategies ul {
    margin: 1rem 0;
    list-style: none;
    padding: 0;
  }

  .related-strategies a {
    font-weight: bold;
    line-height: 1.5;
  }

  @media ${mq.desktop} {
    .related-strategies a {
      ${mixins.text('medium', 'desktop')}
    }
  }

  .meta {
    margin-top: 2.5rem;
  }

  @media ${mq.desktop} {
    .meta {
      align-self: start;
      top: 1rem;
      margin-top: 10rem;
      position: sticky;
    }
  }

  .meta-block + .meta-block {
    margin-top: 1.5rem;
  }

  .meta-block-title {
    ${mixins.text('mini')}

    background: ${colors.blueBrand};
    box-decoration-break: clone;
    color: white;
    display: inline;
    font-weight: 700;
    margin-bottom: 0.5rem;
    margin-top: 0;
    padding: 0.17rem 0.4rem;
  }

  @media ${mq.tablet} {
    .meta-block-title {
      ${mixins.text('mini', 'tablet')}

      font-weight: 700;
    }
  }

  .meta-block-title ~ * {
    margin-top: 0.25rem;
  }

  .meta-block-content {
    ${mixins.text('small')}

    margin-bottom: 0;
    margin-top: 0;
  }

  @media ${mq.tablet} {
    .meta-block-content {
      ${mixins.text('small', 'tablet')}
    }
  }

  @media ${mq.desktop} {
    .meta-block-content {
      ${mixins.text('small', 'desktop')}
    }
  }

  .meta-block-list {
    ${mixins.resetList()}
  }
`;

export const buttonIcon = css.resolve`
  svg {
    height: 1.15rem;
    margin-left: 1rem;
    width: 1.15rem;
  }
`;
