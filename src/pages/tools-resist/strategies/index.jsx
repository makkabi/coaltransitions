import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React, { useState, useEffect, Suspense } from 'react';

import Button from '../../../components/button';
import Constraint from '../../../components/constraint';
import {
  extractPublicationsAuthors,
  extractPublicationsTags,
  filterPublications,
} from '../../../lib/publication';
import FilterLoading from '../../../components/filter/loading';
import FilterButton from '../../../components/filter/button';
import PublicationsList from '../../../components/publication-list';
import Select from '../../../components/select';
import { getFilterFromUrl, setUrlForFilter } from '../../../lib/url';
import { sortBySecondName } from '../../../lib/sort-by-second-name';
import withLayout from '../../../components/with-layout';

const Filter = React.lazy(() => import('../../../components/filter'));

const Page = ({
  data: {
    publications: { nodes: initialPublications },
  },
}) => {
  const tags = extractPublicationsTags(initialPublications);

  const authors = extractPublicationsAuthors(initialPublications);

  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState({
    authors: [],
    tags: [],
  });

  const [count, setCount] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [publications, setPublications] = useState(initialPublications);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (count === 0) {
        setFilter({
          authors: getFilterFromUrl('authors') || [],
          tags: getFilterFromUrl('keywords') || [],
        });
      }

      setPublications(
        filterPublications(initialPublications, {
          authors: filter.authors,
          tags: filter.tags,
        })
      );

      if (count > 0) {
        setUrlForFilter('authors', filter.authors);
        setUrlForFilter('keywords', filter.tags);
      }
    }

    // Show the filter interface if at least one is set
    setShowFilter(
      (filter.authors && filter.authors.length > 0) ||
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
                    placeholder="Authors"
                    name="author"
                    key="authors"
                    options={authors.sort((a, b) =>
                      sortBySecondName({ title: a.label }, { title: b.label })
                    )}
                    value={
                      filter.authors &&
                      filter.authors.map((author) => ({
                        value: author,
                        label: author,
                      }))
                    }
                    onChange={(selected) => {
                      const updatedAuthors =
                        selected && selected.map(({ value }) => value);

                      setFilter((state) => ({
                        ...state,
                        authors: updatedAuthors,
                      }));
                    }}
                    isMulti
                    isSearchable
                  />,

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
                ],

                [
                  <Button
                    key="reset"
                    onClick={(event) => {
                      event.preventDefault();
                      setFilter((state) => ({
                        ...state,
                        authors: [],
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

        {publications && (
          <PublicationsList
            title={`Publications (${publications.length})`}
            publications={publications}
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
    publications: allWpStrategy {
      nodes {
        ...publicationListItem
      }
    }
  }
`;
