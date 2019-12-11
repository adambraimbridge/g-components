/**
 * @file
 * Last updated component
 */

import React from 'react';
import PropTypes from 'prop-types';
import DateTime from '../datetime';
import './styles.scss';

const validDate = date => Object.prototype.toString.call(date) === '[object Date]';

const LastUpdated = ({ lastUpdated, live }) =>
  lastUpdated && validDate(lastUpdated) ? (
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
            Last updated <DateTime datestamp={lastUpdated} />
          </div>
        </div>
      ) : (
        <span>
          Last updated <DateTime datestamp={lastUpdated} />
        </span>
      )}
    </div>
  ) : null;

LastUpdated.propTypes = {
  lastUpdated: PropTypes.instanceOf(Date),
  live: PropTypes.bool,
};
LastUpdated.defaultProps = {
  lastUpdated: false,
  live: true,
};

export default LastUpdated;
