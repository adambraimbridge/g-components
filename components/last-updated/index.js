/**
 * @file
 * Last updated component
 */

import React from 'react';
import PropTypes from 'prop-types';
import DateTime from '../datetime';
import './styles.scss';

const LastUpdated = ({ lastUpdated, live }) => (
  <div className={`last-updated${live ? ' last-updated--live' : ''}`}>
    {live ? (
      <div className="o-teaser o-teaser--small" data-o-component="o-teaser">
        <div className="o-teaser__content">
          <div
            className="o-teaser__timestamp o-teaser__timestamp--inprogress"
            style={{ display: 'inline-block' }}
          >
            <span className="o-teaser__timestamp-prefix" />
          </div>
          {lastUpdated ? (
            <React.Fragment>
              Last updated <DateTime datestamp={lastUpdated} />
            </React.Fragment>
          ) : (
            'Live'
          )}
        </div>
      </div>
    ) : (
      lastUpdated && (
        <span>
          Last updated <DateTime datestamp={lastUpdated} />
        </span>
      )
    )}
  </div>
);

LastUpdated.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date),
  live: PropTypes.bool,
};
LastUpdated.defaultProps = {
  lastUpdated: false,
  live: true,
};

export default LastUpdated;
