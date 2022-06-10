import React from 'react';

import Strategy from './strategy-category';
import style from './style';

export default ({ strategies = null }) => (
  <ul>
    <style jsx>{style}</style>

    {strategies &&
      strategies.map((strategy, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`strategy=${index}`}>
          <Strategy
            {...strategy}
            featuredImage={strategy?.featuredImage?.node}
            theme={index % 2 === 0 ? null : 'green'}
            indexTitle={`${
              strategy.acf.strategyNumber > 1
                ? `Strategy ${strategy.acf.strategyNumber - 1}: `
                : ''
            }${strategy.title}`}
          />
        </li>
      ))}
  </ul>
);
