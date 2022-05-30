const path = require('path');

const fetchStrategies = (graphql) =>
  graphql(`
    {
      strategies: allWpStrategy {
        nodes {
          slug
          databaseId
        }
      }
    }
  `);

const createPages = (data, createPage) => {
  const {
    strategies: { nodes: strategies },
  } = data;

  strategies.forEach(({ slug, databaseId }) => {
    const pagePath = `/tools-resist/strategies/${slug}/`;

    // eslint-disable-next-line no-console
    console.log('Create strategy:', pagePath);

    createPage({
      path: pagePath,
      component: path.resolve('src/templates/strategy/index.jsx'),
      context: {
        databaseId,
      },
    });
  });
};

const createStrategyPages = (graphql, createPage) =>
  fetchStrategies(graphql).then(({ data }) => createPages(data, createPage));

module.exports = {
  createStrategyPages,
};
