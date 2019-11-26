/**
 * @file
 * An o-grid row component
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const GridRow = ({ compact, children }) => (
  <div className={classnames('o-grid-row', compact && 'o-grid-row--compact')}>{children}</div>
);

GridRow.displayName = 'GGridRow';

GridRow.propTypes = {
  compact: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

GridRow.defaultProps = {
  compact: false,
};

export default GridRow;
