/**
 * @file
 * Util functions for UK elections sample data
 */

export const formatResultsData = (data, partiesToShowInTable) => {
  return data.map(d => ({
    party: d.partyName,
    seats: d.partySeats,
    projectedSeats: d.partySeatsForecast,
    voteShare: d.partySharePercentage,
    isInTable: partiesToShowInTable.includes(d.partyName),
    isOthers: d.partyName === 'Independent/Other',
  }));
};

export default null;
