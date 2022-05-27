import { graphql, useStaticQuery } from 'gatsby';
import React, { Fragment } from 'react';

import Researcher from './researcher';
import { sortBySecondName } from '../../lib/sort-by-second-name';
import style from './style';

export default (props) => {
  const {
    researchers: { nodes: items },
  } = useStaticQuery(graphql`
    query Researchers {
      researchers: allWpResearcher {
        nodes {
          title
          acf {
            affiliation
            background
            email
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(height: 200, width: 200, placeholder: BLURRED)
                }
              }
            }
            partOfCoalexitGroup
            phone
            pinToTop
            topics
          }
        }
      }
    }
  `);

  // Sort researchers by second name
  const researchers = items.sort(sortBySecondName);

  const pinnedResearchers = researchers.filter(
    ({ acf: { pin_to_top: pinToTop } }) => pinToTop === true
  );

  const nonPinnedResearchers = researchers.filter(
    ({ acf: { pin_to_top: pinToTop } }) => !pinToTop
  );

  return (
    <Fragment>
      <style jsx>{style}</style>

      <ul {...props}>
        {pinnedResearchers.map((item) => (
          <li key={item.title}>
            <Researcher {...item} />
          </li>
        ))}

        {nonPinnedResearchers.map((item) => (
          <li key={item.title}>
            <Researcher {...item} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
