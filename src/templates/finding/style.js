import css from 'styled-jsx/css';

import { colors, mixins, mq } from '../../token';

export default css`
  .header {
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
    padding: 1.5rem 15rem 1.5rem 2.5rem;
    position: relative;
    width: 75%;
    z-index: 10;
  }

  @media ${mq.tablet} {
    .title {
      ${mixins.text('huge', 'tablet')}
    }
  }

  @media ${mq.desktop} {
    .title {
      ${mixins.text('huge', 'desktop')}
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

  .section-headline {
    ${mixins.text()}

    color: ${colors.blueBrand};
    font-weight: 700;
    margin-bottom: 1.5rem;
    margin-top: 4.5rem;
    text-transform: uppercase;
  }
`;
