import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'react-paragon-topaz';
import { Skeleton } from '@edx/paragon';

import messages from './messages';
import './index.scss';

type CourseCardProps = {
  imageUrl?: string;
  title?: string;
  vendor?: string;
  duration?: string;
  enrolmentUrl?: string;
  isLoading?: boolean;
};

const CourseCard = ({
  imageUrl = '',
  title = '',
  vendor = '',
  duration = '',
  enrolmentUrl = '#',
  isLoading = false,
}: CourseCardProps) => {
  const intl = useIntl();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="mb-3 course-card">
      <div className="course-card__image">
        {isLoading && <Skeleton className="course-card__image-skeleton" />}

        {!isLoading && imageUrl && !imageError && (
          <img
            src={imageUrl}
            alt={title}
            onError={() => setImageError(true)}
          />
        )}

        {!isLoading && (!imageUrl || imageError) && (
        <div className="course-card__image-fallback" />
        )}
      </div>

      <div className="course-card__content">
        <span className="course-card__vendor">
          {isLoading ? <Skeleton width={50} /> : vendor }
        </span>

        <h3 className="course-card__title" title={title}>
          {isLoading ? <Skeleton width={350} /> : title}
        </h3>

        <div className="course-card__meta">
          <span>{isLoading ? <Skeleton width={70} /> : duration}</span>
        </div>

      </div>
      {
        isLoading ? (
          <Skeleton width={234} height={48} />
        )
          : (
            <Button
              as="a"
              href={enrolmentUrl}
              className="course-card__button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {intl.formatMessage(messages.enroll)}
            </Button>
          )
      }
    </div>
  );
};

export default CourseCard;
