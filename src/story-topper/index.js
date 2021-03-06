/**
 * @file
 * Top of a story
 */

import React from 'react';
import PropTypes from 'prop-types';
import Share from '../share';
import Bylines from '../bylines';
import { getMainImage } from '../shared/helpers';
import { mainImagePropType, bylinesPropType, topicPropType, flagsPropType } from '../shared/proptypes';
import './styles.scss';

const StoryTopper = ({
  url,
  topic,
  headline,
  summary,
  relatedArticle,
  mainImage,
  bylines,
  socialHeadline,
  twitterHeadline,
  facebookHeadline,
  tweetText,
  flags,
  ...props
}) => {
  // These really mess with Storyshots' snapshot testing
  const buildTime = props.buildTime || new Date().toISOString(); // eslint-disable-line
  const publishedDate = props.publishedDate || new Date().toISOString(); // eslint-disable-line

  return (
    <div className="story-topper">
      {topic && (
        <div className="topic">
          <a href={topic.url} className="o-editorial-typography-topic">
            {topic.name}
          </a>
        </div>
      )}

      <h1 className="o-editorial-layout-heading-1" itemProp="headline">
        {headline}
      </h1>

      {summary && (
        <p className="o-editorial-typography-standfirst">
          {summary}{' '}
          {relatedArticle && (
            <a href={relatedArticle.url} className="o-typography-link">
              {relatedArticle.text}
            </a>
          )}
        </p>
      )}

      <meta itemProp="dateModified" content={buildTime} suppressHydrationWarning />

      {flags.mainImage && (mainImage.url || mainImage.uuid) && (
        <figure className="graphic graphic-b-1 graphic-pad-1">
          <img alt={mainImage.description} src={getMainImage(mainImage)} />
          <figcaption className="o-typography-caption">
            {mainImage.description}
            {mainImage.description && mainImage.credit && ' '}
            {mainImage.credit}
          </figcaption>
        </figure>
      )}

      {flags.shareButtons && (
        <Share
          url={url}
          text={socialHeadline || headline}
          textTwitter={tweetText || twitterHeadline}
          textFacebook={facebookHeadline}
          dark={flags.dark}
        />
      )}

      {flags.bylines && bylines && (
        <Bylines names={bylines} date={publishedDate} />
      )}
    </div>
  );
};

StoryTopper.propTypes = {
  url: PropTypes.string.isRequired,
  topic: topicPropType,
  headline: PropTypes.string.isRequired,
  summary: PropTypes.string,
  relatedArticle: PropTypes.exact({
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  mainImage: mainImagePropType,
  bylines: bylinesPropType,
  socialHeadline: PropTypes.string,
  twitterHeadline: PropTypes.string,
  facebookHeadline: PropTypes.string,
  tweetText: PropTypes.string,
  flags: flagsPropType.isRequired,
  publishedDate: PropTypes.string.isRequired,
  buildTime: PropTypes.string.isRequired,
};

StoryTopper.displayName = 'GStoryTopper';

export default StoryTopper;
