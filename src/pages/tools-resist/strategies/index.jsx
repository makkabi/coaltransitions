import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React, { useState, useEffect, Suspense } from 'react';

import Button from '../../../components/button';
import Constraint from '../../../components/constraint';
import FilterLoading from '../../../components/filter/loading';
import FilterButton from '../../../components/filter/button';
import Select from '../../../components/select';
import { getFilterFromUrl, setUrlForFilter } from '../../../lib/url';
import { sortBySecondName } from '../../../lib/sort-by-second-name';
import withLayout from '../../../components/with-layout';
import StrategiesList from '../../../components/strategies-list';
import { extractStrategyTerms, filterStrategies } from '../../../lib/strategy';

const Filter = React.lazy(() => import('../../../components/filter'));

const Page = ({
  data: {
    strategies: { nodes: initialStrategies },
  },
}) => {
  const tags = extractStrategyTerms(initialStrategies, 'strategyTags');
  const actors = extractStrategyTerms(initialStrategies, 'actorTags');

  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState({
    actors: [],
    tags: [],
  });

  const [count, setCount] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [strategies, setStrategies] = useState(initialStrategies);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (count === 0) {
        setFilter({
          actors: getFilterFromUrl('actors') || [],
          tags: getFilterFromUrl('keywords') || [],
        });
      }

      setStrategies(
        filterStrategies(initialStrategies, {
          actors: filter.actors,
          tags: filter.tags,
        })
      );

      if (count > 0) {
        setUrlForFilter('actors', filter.actors);
        setUrlForFilter('keywords', filter.tags);
      }
    }

    // Show the filter interface if at least one is set
    setShowFilter(
      (filter.actors && filter.actors.length > 0) ||
        (filter.tags && filter.tags.length > 0)
    );
    setCount(count + 1);
  }, [filter]);

  return (
    <>
      <Helmet title="Inventory of Coping Strategies" />

      <Constraint wide>
        <FilterButton onClick={() => setShowFilter(!showFilter)}>
          Filter
        </FilterButton>

        {showFilter && (
          <Suspense fallback={<FilterLoading text="Loading Filter …" />}>
            <Filter
              rows={[
                [
                  <Select
                    placeholder="Keywords"
                    name="tags"
                    key="tags"
                    options={tags.sort(({ label: aLabel }, { label: bLabel }) =>
                      aLabel.toLowerCase().localeCompare(bLabel.toLowerCase())
                    )}
                    value={
                      filter.tags &&
                      filter.tags.map((tag) => ({
                        value: tag,
                        label: tags.find(({ value }) => value === tag).label,
                      }))
                    }
                    onChange={(selected) => {
                      const selectedTags =
                        selected && selected.map(({ value }) => value);

                      setFilter((state) => ({
                        ...state,
                        tags: selectedTags,
                      }));
                    }}
                    isMulti
                    isSearchable
                  />,

                  <Select
                    placeholder="Actors"
                    name="actor"
                    key="actors"
                    options={actors.sort((a, b) =>
                      sortBySecondName({ title: a.label }, { title: b.label })
                    )}
                    value={
                      filter.actors &&
                      filter.actors.map((actor) => ({
                        value: actor,
                        label: actor,
                      }))
                    }
                    onChange={(selected) => {
                      const updatedAuthors =
                        selected && selected.map(({ value }) => value);

                      setFilter((state) => ({
                        ...state,
                        actors: updatedAuthors,
                      }));
                    }}
                    isMulti
                    isSearchable
                  />,
                ],

                [
                  <Button
                    key="reset"
                    onClick={(event) => {
                      event.preventDefault();
                      setFilter((state) => ({
                        ...state,
                        actors: [],
                        tags: [],
                      }));
                    }}
                  >
                    Reset
                  </Button>,
                ],
              ]}
            />
          </Suspense>
        )}

        {strategies && (
          <StrategiesList
            title={`Strategies (${strategies.length})`}
            strategies={strategies}
            onFilter={(filterKey, filterValue) => {
              setFilter({
                [filterKey]: filterValue,
              });
            }}
          />
        )}
      </Constraint>
    </>
  );
};

export default withLayout(Page);

export const query = graphql`
  query {
    strategies: allWpStrategy {
      nodes {
        ...strategyListItem
      }
    }
  }
`;
