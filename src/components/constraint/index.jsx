import classnames from 'classnames';
import React from 'react';

import style from './style';

export default ({
  children,
  wide = false,
  superwide = false,
  topLevel = false,
  fullWidth = false,
  ...attrs
}) => (
  <div
    className={classnames(
      'constraint',
      { 'constraint--wide': wide && !fullWidth },
      { 'constraint--superwide': superwide && !fullWidth },
      { 'constraint--toplevel': topLevel && !fullWidth },
      { 'constraint--full-width': fullWidth }
    )}
    {...attrs}
  >
    <style jsx>{style}</style>

    {children}
  </div>
);
