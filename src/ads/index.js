/**
 * @file
 * Various ad sizes
 */

import React from 'react';
import './styles.scss';

export const TopAd = () => (
  <div
    className="o-ads o-ads--center o-ads--background o-ads--reserve-90"
    data-o-ads-name="top-ad"
    data-o-ads-targeting="pos=top;"
    data-o-ads-formats-default="false"
    data-o-ads-formats-small="false"
    data-o-ads-formats-medium="Leaderboard,Responsive"
    data-o-ads-formats-large="SuperLeaderboard,Leaderboard,Responsive"
    data-o-ads-formats-extra="Billboard,SuperLeaderboard,Leaderboard,Responsive"
    aria-hidden="true"
  />
);

TopAd.displayName = 'GTopAd';

export const MiddleAd = () => (
  <div
    className="o-ads o-ads--center o-ads--background o-ads--reserve-250"
    data-o-ads-name="mid-ad"
    data-o-ads-targeting="pos=mid;"
    data-o-ads-formats-default="Responsive"
    data-o-ads-formats-small="MediumRectangle,Responsive"
    data-o-ads-formats-medium="MediumRectangle,Responsive"
    data-o-ads-formats-large="MediumRectangle,Responsive"
    data-o-ads-formats-extra="MediumRectangle,Responsive"
    aria-hidden="true"
  />
);

MiddleAd.displayName = 'GMiddleAd';
