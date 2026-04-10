import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'react-paragon-topaz';
import { Skeleton } from '@openedx/paragon';
import { Link, useParams, useLocation } from 'react-router-dom';

import messages from './messages';
import './index.scss';

type CourseCardProps = {
  imageUrl?: string;
  title?: string;
  vendor?: string;
  duration?: string;
  enrolmentUrl?: string;
  isLoading?: boolean;
  courseKey?: string;
};

const CourseCard = ({
  imageUrl = '',
  title = '',
  vendor = '',
  duration = '',
  enrolmentUrl = '#',
  isLoading = false,
  courseKey,
}: CourseCardProps) => {
  const intl = useIntl();
  const [imageError, setImageError] = useState(false);
  const { catalogID } = useParams<{ catalogID: string }>();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const couponCode = params.get('coupon_code');

  const isDisabled = !courseKey || isLoading;

  const to = !isDisabled
    ? `/catalog/${catalogID}/${courseKey}?coupon_code=${couponCode}`
    : '#';

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
        {vendor && (
          <span className="course-card__vendor">
            {isLoading ? <Skeleton width={50} /> : vendor}
          </span>
        )}

        <Link
          to={to}
          className={`course-card__title ${isDisabled ? 'disabled' : ''}`}
          onClick={(e) => {
            if (isDisabled) { e.preventDefault(); }
          }}
          title={title}
        >
          {isLoading ? <Skeleton width={350} /> : title}
        </Link>

        {duration && (
          <div className="course-card__meta">
            <span>{isLoading ? <Skeleton width={70} /> : duration}</span>
          </div>
        )}
      </div>

      {!isLoading && enrolmentUrl && (
        <Button
          as="a"
          href={enrolmentUrl}
          className="course-card__button"
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.formatMessage(messages.enroll)}
        </Button>
      )}
    </div>
  );
};

export default CourseCard;
