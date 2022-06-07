const path = require('path');

const fetchStrategyCategories = (graphql) =>
  graphql(`
    {
      strategyCategories: allWpStrategyCategory {
        nodes {
          slug
          databaseId
        }
      }
    }
  `);

const createPages = (data, createPage) => {
  const {
    strategyCategories: { nodes: strategyCategories },
  } = data;

  strategyCategories.forEach(({ slug, databaseId }) => {
    const pagePath = `/tools-resist/${slug}/`;
    const context = {
      databaseId,
    };

    // eslint-disable-next-line no-console
    console.log('Create strategy category:', pagePath);

    createPage({
      path: pagePath,
      component: path.resolve('src/templates/strategy-category/index.jsx'),
      context,
    });
  });
};

const createStrategyCategoryPages = (graphql, createPage) =>
  fetchStrategyCategories(graphql).then(({ data }) =>
    createPages(data, createPage)
  );

module.exports = {
  createStrategyCategoryPages,
};
