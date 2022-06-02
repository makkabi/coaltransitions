import React from 'react';

import Button from '../button';
import Strategy from './strategy';
import style from './style';

export default ({ title, strategies = [], onFilter, showAllLink = false }) => (
  <div className="strategies-container">
    <style jsx>{style}</style>

    {title && (
      <h2 className="title">
        {title}

        {showAllLink && (
          <>
            <hr />
            <Button
              to="/tools-resist/strategies/"
              theme="blue"
              aria-label="Show all Strategies"
            >
              All
            </Button>
          </>
        )}
      </h2>
    )}

    {strategies && strategies.length > 0 ? (
      <ul>
        {strategies.map(({ slug, ...attributes }) => (
          <li key={slug}>
            <Strategy
              url={`/tools-resist/strategies/${slug}/`}
              onFilter={onFilter}
              {...attributes}
            />
          </li>
        ))}
      </ul>
    ) : (
      <div>No strategy matching your criteria ...</div>
    )}
  </div>
);
