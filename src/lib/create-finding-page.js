const path = require('path');

const fetchFindings = graphql =>
  graphql(`
    {
      findings: allWordpressWpFindings {
        nodes {
          slug
          wordpress_id
        }
      }
    }
  `);

const createPages = (data, createPage) => {
  const {
    findings: { nodes: findings }
  } = data;

  findings.forEach(({ slug, wordpress_id: wordpressId }) => {
    const pagePath = `/findings/${slug}/`;

    // eslint-disable-next-line no-console
    console.log('Create finding:', pagePath);

    createPage({
      path: pagePath,
      component: path.resolve('src/templates/finding/index.jsx'),
      context: {
        wordpressId
      }
    });
  });
};

const createFindingPages = (graphql, createPage) =>
  fetchFindings(graphql).then(({ data }) => createPages(data, createPage));

module.exports = {
  createFindingPages
};