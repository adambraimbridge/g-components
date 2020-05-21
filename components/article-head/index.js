/**
 * @file
 * Top of the article
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Share from '../share';
import { getMainImage } from '../../shared/helpers';
import { mainImagePropType, topicPropType, flagsPropType } from '../../shared/proptypes';
import Byline, { BylinesPropType } from './byline';
import './styles.scss';

const ArticleHead = ({
  topic,
  headline,
  summary,
  relatedArticle,
  mainImage,
  flags,
  bylines,
  ...props
}) => {
  // These really mess with Storyshots' snapshot testing
  const buildTime = props.buildTime || new Date().toISOString(); // eslint-disable-line
  const publishedDate = props.publishedDate || new Date().toISOString(); // eslint-disable-line

  return (
    <Fragment>
      <div>
        <a href={topic.url} className="o-editorial-typography-topic">
          {topic.name}
        </a>
      </div>

      <h1 className="o-editorial-layout-heading-1" itemProp="headline">
        {headline}
      </h1>

      <p className="o-editorial-typography-standfirst">
        {summary}{' '}
        {relatedArticle && (
          <a href={relatedArticle.url} className="o-typography-link">
            {relatedArticle.text}
          </a>
        )}
      </p>
      <meta itemProp="dateModified" content={buildTime} suppressHydrationWarning />

      {(mainImage.url || mainImage.uuid) && (
        <figure className="graphic graphic-b-1 graphic-pad-1">
          <img alt={mainImage.description} src={getMainImage(mainImage)} />
          <figcaption className="o-typography-caption">
            {mainImage.description}
            {mainImage.credit}
          </figcaption>
        </figure>
      )}

      {flags && flags.shareButtons && <Share headline={headline} {...{ ...props, flags }} />}

      <Byline names={bylines} date={publishedDate} />
    </Fragment>
  );
};

ArticleHead.displayName = 'GArticleHead';

ArticleHead.propTypes = {
  flags: flagsPropType.isRequired,
  headline: PropTypes.string.isRequired,
  summary: PropTypes.string,
  mainImage: mainImagePropType,
  relatedArticle: PropTypes.shape({
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  publishedDate: PropTypes.string,
  buildTime: PropTypes.string,
  topic: topicPropType,
  bylines: BylinesPropType,
};

ArticleHead.defaultProps = {
  mainImage: {
    uuid: 'f07ccec8-7ded-11e8-af48-190d103e32a4',
  },
  relatedArticle: {},
  publishedDate: false,
  buildTime: false,
  summary: '',
  topic: {},
  bylines: [],
};

ArticleHead.displayName = 'GArticleHead';

export default ArticleHead;
export { Byline };
