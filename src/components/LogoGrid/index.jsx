import { graphql } from 'gatsby';
import React from 'react';


import style from './style';
import Figure from '../figure';
import { getImage } from 'gatsby-plugin-image';

export const fragment = graphql`
  fragment LogoGrid on WpPage_Acf_Content_Logogrid {
    logos {
      link
      logo {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 200
              placeholder: BLURRED
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;

const LogoGrid = ({ logos, ...props }) => (
  <ul {...props}>
    <style jsx>{style}</style>

    {logos.map(({ link, logo }) => {
      const image = getImage(logo?.localFile);
      return (
        <li key={link}>
          <a href={link}>
            <div>
              <Figure altText={logo.altText} image={image} />
            </div>
          </a>
        </li>
      );
    })}
  </ul>
);

export default LogoGrid;
