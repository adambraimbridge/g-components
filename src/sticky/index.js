/**
 * @file
 * Component using IntersectionObserver for scrollytelling
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Observer from 'react-scroll-percentage';
import './styles.scss';

const Sticky = ({ article, graphic }) => {
  const [current, setCurrent] = useState();

  const updateGraphic = label => {
    setCurrent(label);
  };

  return (
    <Observer>
      {({ percentage, inView }) => (
        <div className="sticky__container">
          <article className="sticky__text">
            {article({ percentage, inView, updateGraphic })}
          </article>
          <figure className="sticky__figure">{graphic({ percentage, inView, current })}</figure>
        </div>
      )}
    </Observer>
  );
};

Sticky.displayName = 'GSticky';

Sticky.propTypes = {
  article: PropTypes.func.isRequired,
  graphic: PropTypes.func.isRequired,
};

export default Sticky;
