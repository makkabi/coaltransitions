const { createFindingPages } = require('./src/lib/create-finding-page');
const { createWpNews } = require('./src/lib/create-news-page');
const { createPublicationPages } = require('./src/lib/create-publication-page');
const { createPages } = require('./src/lib/create-page');
const { createStrategyPages } = require('./src/lib/create-strategy-page');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return Promise.all([
    createPublicationPages(graphql, createPage),
    createFindingPages(graphql, createPage),
    createStrategyPages(graphql, createPage),
    createWpNews(graphql, actions),
    createPages(graphql, actions),
  ]);
};
