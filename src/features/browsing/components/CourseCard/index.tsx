import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'react-paragon-topaz';

import messages from './messages';
import './index.scss';

type CourseCardProps = {
  imageUrl?: string;
  title?: string;
  vendor?: string;
  duration?: string;
  enrolmentUrl?: string;
};

const CourseCard = ({
  imageUrl = '',
  title = '',
  vendor = 'N/A',
  duration = 'N/A',
  enrolmentUrl = '#',
}: CourseCardProps) => {
  const intl = useIntl();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="course-card">
      <div className="course-card__image">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="course-card__image-fallback" />
        )}
      </div>

      <div className="course-card__content">
        <span className="course-card__vendor">{vendor}</span>

        <h3 className="course-card__title" title={title}>
          {title}
        </h3>

        <div className="course-card__meta">
          <span>{duration}</span>
        </div>

      </div>
      <Button
        as="a"
        href={enrolmentUrl}
        className="course-card__button"
        target="_blank"
        rel="noopener noreferrer"
      >
        {intl.formatMessage(messages.enroll)}
      </Button>
    </div>
  );
};

export default CourseCard;
