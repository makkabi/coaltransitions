import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';

import BlockSwitch from '../../components/BlockSwitch';
import Constraint from '../../components/constraint';
import Intro from '../../components/intro';
import SubMenu from '../../components/sub-menu';
import withLayout from '../../components/with-layout';

import style from './style';
import { featuredImage as featuredImageStyle } from '../finding/style';
import { getImage } from 'gatsby-plugin-image';
import Figure from '../../components/figure';
import { captionStyle } from '../../components/findings-list/finding/style';
import { submenuItems as toolSubmenuItems } from '../../lib/tools-submenu';
const Page = ({
  data: {
    subMenuItems,

    page: {
      title,

      featuredImage,
      acf: { intro, content, fullWidth = false },
    },
  },
}) => {
  const image = getImage(featuredImage?.node?.localFile);
  image.sizes = '100vw';
  image.width = 1920;
  image.height = 1080;

  image.images.sources.forEach((source) => {
    source.sizes = '100vw';
  });

  image.images.fallback.sizes = '100vw';
  return (
    <React.Fragment>
      <style jsx>{style}</style>
      <style>{featuredImageStyle.styles}</style>
      <Helmet title={title} />

      {/* Hard Encode this Items, since  I found no way to get the page id here */}
      <SubMenu items={toolSubmenuItems} />
      {/* <SubMenu {...subMenuItems} />*/}
      <header className="header">
        <h1 className="title" dangerouslySetInnerHTML={{ __html: title }} />
        <style>{`.header img { width: 100%; }`}</style>
        {image && (
          <Figure
            altText={featuredImage.altText}
            image={image}
            caption={featuredImage.caption}
            captionClassName={captionStyle.className}
          />
        )}
      </header>
      <article>
        <Constraint topLevel fullWidth={fullWidth}>
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
        fullWidth
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
        }
      }
    }
  }
`;
