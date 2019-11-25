/**
 * @file
 * Seats bar chart component
 * @tags ge2019
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { uk } from '@financial-times/politics';
import './styles.scss';

const { getPartyInfo } = uk;

const SeatsBarChart = ({
  className,
  title,
  keyText,
  tableHeaders,
  data,
  majority,
  showShortPartyNames,
}) => {
  const showProjectedSeats = data.some(({ projectedSeats }) => projectedSeats);

  const seatsData = data.map(({ seats, projectedSeats, ...d }) => ({
    seats,
    projectedSeats,
    seatsCeiling: projectedSeats || seats,
    projectedSeatsOverWon: (projectedSeats || seats) - seats,
    ...d,
  }));

  const tableData = [
    ...seatsData
      .filter(({ isInTable, isOthers }) => isInTable && !isOthers)
      .sort((a, b) => b.seatsCeiling - a.seatsCeiling),
    ...seatsData.filter(({ isOthers }) => isOthers),
  ];

  const footnoteData = data.filter(({ isInTable }) => !isInTable).sort((a, b) => b.seats - a.seats);

  const maxSeats = tableData.reduce((acc, { seatsCeiling }) => Math.max(acc, seatsCeiling), 0);
  const maxValue = Math.max(majority, maxSeats);
  const calcPercentage = seats => (seats / maxValue) * 100;

  return (
    <div className={className}>
      <div className={`${className}__header`}>
        <h3 className={`${className}__title`}>{title}</h3>

        {showProjectedSeats && (
          <div className={`${className}__key`}>
            <span className={`${className}__key-rect`}>
              <span
                className={`${className}__key-rect-overlay`}
                style={{
                  backgroundImage: `repeating-linear-gradient(50deg, transparent, transparent 3px, ${'#fff1e5'} 3px, ${'#fff1e5'} 5px)`,
                }}
              />
            </span>

            <span className={`${className}__key-text`}>{`= ${keyText}`}</span>
          </div>
        )}
      </div>

      <table className={`${className}__table`}>
        <span className={`${className}__majority-line-container`}>
          <span
            className={`${className}__majority-line`}
            style={{ left: `${calcPercentage(majority)}%` }}
          />
          <span
            className={`${className}__majority-text`}
            style={{ left: `${calcPercentage(majority)}%` }}
          >
            Majority
          </span>
        </span>

        <thead>
          <tr>
            {tableHeaders.map(tableHeader => (
              <th key={`th_${tableHeader}`}>{tableHeader}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map(
            ({ party, seats, seatsCeiling, projectedSeatsOverWon, voteShare, isOthers }) => {
              const { formattedName, shortName, color, whiteOverlayOpacity } = getPartyInfo(party);
              return (
                <tr className={`row${isOthers ? ' row--others' : ''}`} key={`row_${party}`}>
                  <td className={`party${isOthers ? ' party--others' : ''}`}>
                    <span className="party-badge" style={{ backgroundColor: color }} />
                    <span className="party-bar-container">
                      <span
                        className="party-bar"
                        style={{
                          backgroundColor: color,
                          width: `${calcPercentage(seatsCeiling)}%`,
                        }}
                      />
                      {projectedSeatsOverWon !== 0 && (
                        <span
                          className="party-bar party-bar--projected"
                          style={{
                            backgroundImage: `repeating-linear-gradient(50deg, transparent, transparent 3px, ${'#fff1e5'} 3px, ${'#fff1e5'} 5px)`,
                            width: `${calcPercentage(projectedSeatsOverWon)}%`,
                            left: `${calcPercentage(seats)}%`,
                          }}
                        />
                      )}
                      <span
                        className="party-bar party-bar--overlay"
                        style={{
                          width: `${calcPercentage(seatsCeiling)}%`,
                          backgroundColor:
                            whiteOverlayOpacity !== undefined
                              ? `rgba(255, 255, 255, ${whiteOverlayOpacity})`
                              : 'rgba(255, 255, 255, 0.3)',
                        }}
                      />
                      <span className="party-name party-name--desktop">
                        {showShortPartyNames ? shortName : formattedName}
                      </span>
                      <span className="party-name party-name--mobile">{shortName}</span>
                    </span>
                  </td>
                  <td className="seats">{seats}</td>
                  <td className="voteshare">{voteShare ? voteShare.toFixed(1) : '-'}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>

      <div className={`${className}__footnote`}>
        {footnoteData.map(({ party, seats }, index, arr) => {
          const { shortName, color } = getPartyInfo(party);
          return (
            <Fragment>
              {shortName} (<span className="seats">{seats}</span>)
              {index !== arr.length - 1 ? ', ' : ''}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

SeatsBarChart.displayName = 'GSeatsBarChart';

SeatsBarChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  keyText: PropTypes.string,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      party: PropTypes.string,
      seats: PropTypes.number,
      projectedSeats: PropTypes.number,
      voteShare: PropTypes.number,
      isOthers: PropTypes.bool.isOptional,
      isInTable: PropTypes.bool,
    }),
  ).isRequired,
  majority: PropTypes.number,
  showShortPartyNames: PropTypes.bool,
};

SeatsBarChart.defaultProps = {
  className: 'g-seats-bar-chart',
  title: 'Number of seats won',
  keyText: 'PA Projection',
  showShortPartyNames: false,
};

export default SeatsBarChart;
