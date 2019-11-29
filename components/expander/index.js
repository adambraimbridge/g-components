/**
 * @file
 * A wrapper component for showing or hiding child content
 */

import React, { Children, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

export const Expander = ({ children, showLabel, itemsToShow, showLessText, showMoreText }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="g-expander">
      <div className="g-expander__header">
        {
          <button
            className={classnames(
              'g-expander__expand-button',
              expanded && 'g-expander__expand-button--open',
            )}
            type="button"
            onClick={() => setExpanded(!expanded)}
          >
            {showLabel && <span>{expanded ? showLessText : showMoreText}</span>}
            <i />
          </button>
        }
      </div>
      {(expanded && <div className="g-expander__children">{children}</div>) ||
        (!expanded &&
          Children.count(children) > 1 &&
          Children.toArray(children).slice(0, itemsToShow))}
    </div>
  );
};

Expander.propTypes = {
  showLabel: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  itemsToShow: PropTypes.number,
  showLessText: PropTypes.string,
  showMoreText: PropTypes.string,
};

Expander.defaultProps = {
  showLabel: true,
  itemsToShow: 3,
  showLessText: 'Show less',
  showMoreText: 'Show more',
};

Expander.displayName = 'GExpander';

export default Expander;
