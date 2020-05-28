/**
 * @file
 * Byline component
 */

import React, { Fragment, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ODate from '@financial-times/o-date';
import { ftdate } from '../shared/helpers';

export const BylinesPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
]);

const NamesElement = ({ namesList }) =>
  namesList.reduce((a, name, i) => {
    /* eslint-disable no-nested-ternary */
    const separator = i === 0 ? '' : i === namesList.length - 1 ? ' and ' : ', ';
    const location = name.location && <Fragment> {name.location}</Fragment>;
    const author = name.url ? (
      <Fragment key={`author-${name.name}`}>
        <a href={name.url} className="o-editorial-typography-author">
          {name.name}
        </a>{' '}
        in {location}
      </Fragment>
    ) : (
      <Fragment key={`author-${name.name}`}>
        <span className="o-editorial-typography-author">{name.name}</span> in {location}
      </Fragment>
    );
    return a.concat(separator, author);
  }, []);

const DateElement = ({ dateRef, date }) => (
  <Fragment>
    {' '}
    <time
      ref={dateRef}
      data-o-component="o-date"
      className="o-date o-editorial-typography-byline-timestamp"
      dateTime={date}
      suppressHydrationWarning
    >
      {ftdate(new Date(date))}
    </time>
  </Fragment>
);

const Byline = ({ names, date }) => {
  const dateRef = useRef();

  useEffect(() => {
    (async () => {
      new ODate(dateRef.current); // eslint-disable-line no-new
    })();
  }, []);

  if (!names && !date) return null;

  const namesList = Array.isArray(names) ? names : [names];

  return (
    <div className="byline">
      {names && (
        <NamesElement
          namesList={namesList.length ? namesList : [{ name: 'FT Staff', location: 'London' }]}
        />
      )}
      {date && <DateElement dateRef={dateRef} date={date} />}
    </div>
  );
};

Byline.displayName = 'GByline';

Byline.propTypes = {
  names: BylinesPropType,
  date: PropTypes.string,
};

Byline.defaultProps = {
  names: null,
  date: null,
};

export default Byline;
