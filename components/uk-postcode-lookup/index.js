/**
 * @file
 * UK postcode lookup
 */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './styles.scss';

const UKPostcodeLookup = ({ className, ...props }) => (
  <div className={classNames(className, 'g-uk-postcode-lookup')} />
);

UKPostcodeLookup.propTypes = {
  className: PropTypes.string,
};

UKPostcodeLookup.defaultProps = {
  className: null,
};

export default UKPostcodeLookup;
