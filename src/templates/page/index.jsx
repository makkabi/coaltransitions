import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';

import BlockSwitch from '../../components/BlockSwitch';
import Constraint from '../../components/constraint';
import Intro from '../../components/intro';
import Picture from '../../components/picture';
import SubMenu from '../../components/sub-menu';
import withLayout from '../../components/with-layout';

import style from './style';

const Page = ({
  data: {
    subMenuItems,
    page: {
      title,
      featuredImage,
      acf: { intro, content },
    },
  },
}) => (
  <React.Fragment>
    <style jsx>{style}</style>

    <Helmet title={title} />

    <SubMenu {...subMenuItems} />

    <article>
      <Constraint topLevel>
        {featuredImage?.node?.localFile && (
          <Picture
            image={featuredImage.node.localFile}
            caption={featuredImage?.node?.caption}
          />
        )}

        <h1 dangerouslySetInnerHTML={{ __html: title }} />

        {intro && <Intro intro={intro} />}

        <BlockSwitch blocks={content} typePrefix="WpPage_Acf_Content_" />
      </Constraint>
    </article>
  </React.Fragment>
);

export default withLayout(Page);

export const query = graphql`
  query($databaseId: Int, $siblings: [Int!]) {
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
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 800
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
              caption
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
        }
      }
    }
  }
`;
