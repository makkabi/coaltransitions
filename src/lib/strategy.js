export function extractStrategyTerms(strategies, taxonomy) {
  const terms = strategies.reduce((acc, strategy) => {
    const {
      [taxonomy]: { nodes: allTerms },
    } = strategy;

    if (allTerms) {
      allTerms.forEach(({ slug, name }) => {
        acc[slug] = name;
      });
    }

    return acc;
  }, {});

  return Object.entries(terms).map(([value, label]) => ({ value, label }));
}

export function strategyContainsAllTerms(strategy, terms, taxonomy) {
  if (!terms || terms.length === 0) {
    return true;
  }

  return terms.reduce((acc, searchedSlug) => {
    const strategyTerms = strategy?.[taxonomy]?.nodes;

    if (
      strategyTerms &&
      strategyTerms.find(({ slug }) => {
        return slug === searchedSlug;
      }) === undefined
    ) {
      // eslint-disable-next-line no-param-reassign
      acc = false;
    }

    return acc;
  }, true);
}

export function filterStrategies(strategies, { actors, tags }) {
  return strategies.reduce((acc, strategy) => {
    if (
      strategyContainsAllTerms(strategy, tags, 'strategyTags') &&
      strategyContainsAllTerms(strategy, actors, 'actorTags')
    ) {
      acc.push(strategy);
    }

    return acc;
  }, []);
}
