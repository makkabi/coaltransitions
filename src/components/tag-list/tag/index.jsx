import Link from 'gatsby-link';
import React from 'react';

import { linkStyle } from './style';

export default ({
  to,
  slug,
  children,
  onFilter,
  filterUrl,
  filterName,
  ...attributes
}) => (
  <Link
    to={`${filterUrl}${slug}`}
    onClick={(event) => {
      if (onFilter) {
        event.preventDefault();
        onFilter(filterName, [slug]);
      }
    }}
    className={linkStyle.className}
    {...attributes}
  >
    {linkStyle.styles}
    {children}
  </Link>
);
