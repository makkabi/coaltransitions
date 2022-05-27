import React from 'react';
import { graphql } from 'gatsby';

import Richtext from '../richtext';
import style from './style';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../figure';

export default ({ name, summary, link, logo }) => {
  const image = getImage(logo?.localFile);

  return (
    <div className="partner">
      <style jsx>{style}</style>

      {image && (
        <a href={link} rel="nofollow" className="image-container">
          <Figure altText={logo.altText} image={image} />
        </a>
      )}

      <div className="content-container">
        <h3 className="title">
          <a href={link} className="title-link">
            {name}
          </a>
        </h3>

        <Richtext content={summary} />
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment PartnerPage on WpPage_Acf_Content_Partner {
    name
    summary
    link
    logo {
      altText
      localFile {
        childImageSharp {
          gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
        }
      }
    }
  }

  fragment PartnerAbout on WpAboutPage_Acf_Content_Partner {
    name
    summary
    link
    logo {
      altText
      localFile {
        childImageSharp {
          gatsbyImageData(width: 800, placeholder: BLURRED, layout: CONSTRAINED)
        }
      }
    }
  }
`;
