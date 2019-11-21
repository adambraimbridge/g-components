/**
 * @file
 * Constituency race result indicator for GE2019
 * @tags ge2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uk } from '@financial-times/politics';
import './styles.scss';

const { getPartyInfo } = uk;

const RaceResult = ({ incumbent, winner, backgroundColor }) => {
  if (!incumbent || !winner) return null;
  const incumbentParty = getPartyInfo(incumbent);
  const winnerParty = getPartyInfo(winner);
  const text =
    winner !== incumbent
      ? `${winnerParty.formattedName} gain`
      : `${winnerParty.formattedName} hold`;
  return (
    <div className="race-result">
      <div className="race-result--incumbent" style={{ backgroundColor: incumbentParty.color }} />
      <div
        className="race-result--triangle-background"
        style={{
          borderColor: `transparent transparent transparent ${backgroundColor}`,
        }}
      />
      <div
        className="race-result--triangle"
        style={{
          borderColor: `transparent transparent transparent ${incumbentParty.color}`,
        }}
      />
      <div className="race-result--outcome" style={{ backgroundColor: winnerParty.color }}>
        {text}
      </div>
    </div>
  );
};

RaceResult.propTypes = {
  winner: PropTypes.string.isRequired,
  incumbent: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

RaceResult.defaultProps = {
  backgroundColor: '#fff1e5',
};

export default RaceResult;
