import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';

import BlockSwitch from '../../components/BlockSwitch';
import Constraint from '../../components/constraint';
import Intro from '../../components/intro';
import SubMenu from '../../components/sub-menu';
import withLayout from '../../components/with-layout';

import style from './style';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../../components/figure';

const Page = ({
  data: {
    subMenuItems,
    page: {
      title,
      featuredImage,
      acf: { intro, content },
    },
  },
}) => {
  const image = getImage(featuredImage?.node?.localFile);

  return (
    <React.Fragment>
      <style jsx>{style}</style>

      <Helmet title={title} />

      <SubMenu {...subMenuItems} />

      <article>
        <Constraint topLevel>
          {image && (
            <Figure
              altText={featuredImage.altText}
              image={image}
              caption={featuredImage.caption}
            />
          )}

          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          {intro && <Intro intro={intro} />}
          <BlockSwitch blocks={content} typePrefix="WpPage_Acf_Content_" />
        </Constraint>
      </article>
    </React.Fragment>
  );
};

export default withLayout(Page);

export const query = graphql`
  query ($databaseId: Int, $siblings: [Int!]) {
    subMenuItems: allWpPage(
      sort: { fields: menuOrder, order: ASC }
      filter: { databaseId: { in: $siblings } }
    ) {
      ...SubMenuPages
    }
    page: wpPage(databaseId: { eq: $databaseId }) {
      title
      featuredImage {
        node {
          caption
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 600
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
          }
        }
      }
      acf {
        intro
        content {
          __typename
          ... on WpPage_Acf_Content_Text {
            text
          }
          ... on WpPage_Acf_Content_Image {
            image {
              altText
              caption
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 800, placeholder: BLURRED)
                }
              }
            }
          }
          ... on WpPage_Acf_Content_Researchers {
            showresearchers
          }
          ... on WpPage_Acf_Content_Researchprojectslist {
            ...ResearchProjectList
          }
          ... on WpPage_Acf_Content_Newsletter {
            ...Newsletter
          }
          ... on WpPage_Acf_Content_Logogrid {
            ...LogoGrid
          }
          ... on WpPage_Acf_Content_Partner {
            ...PartnerPage
          }
          ... on WpPage_Acf_Content_RelatedPublications {
            ...PublicationList
          }

          ... on WpPage_Acf_Content_Findings {
            title
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
                }
              }
            }
          }
        }
      }
    }
  }
`;
