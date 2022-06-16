import { Helmet } from 'react-helmet';
import React from 'react';
import { graphql } from 'gatsby';

import StrategyCategoryList from '../../../components/strategy-category-list';
import withLayout from '../../../components/with-layout';
import SubMenu from '../../../components/sub-menu';
import { submenuItems } from '../../../lib/tools-submenu';

const Page = ({
  data: {
    strategyCategories: { nodes: strategyCategories },
  },
}) => (
  <>
    <Helmet title="Strategies" />
    <SubMenu items={submenuItems} />
    <StrategyCategoryList strategies={strategyCategories} />
  </>
);

export default withLayout(Page);

export const query = graphql`
  query {
    strategyCategories: allWpStrategyCategory(
      sort: { fields: [acf___strategyNumber] }
    ) {
      nodes {
        ...strategyCategoryListItem
      }
    }
  }
`;
