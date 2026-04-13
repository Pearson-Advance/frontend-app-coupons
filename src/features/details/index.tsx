import { useEffect } from 'react';
import { Breadcrumb } from '@openedx/paragon';
import { Button } from 'react-paragon-topaz';
import { useIntl } from 'react-intl';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { RouteParams } from 'shared/types';
import PageSkeleton from 'features/details/components/Skeleton';
import ErrorState from 'features/details/components/Error';
import useCourseDetail from 'hooks/useCourseDetail';
import { parseHtml } from 'shared/helpers';
import messages from './messages';
import './index.scss';

const Details = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { catalogID, courseKey } = useParams<RouteParams>();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const couponCode = params.get('coupon_code');

  const { data, isLoading } = useCourseDetail(catalogID!, courseKey!, couponCode!);

  const handleBack = () => navigate(`/catalog/${catalogID}/?coupon_code=${couponCode}`);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isLoading) { return <PageSkeleton />; }
  if (!data || Object.keys(data).length === 0) {
    return <ErrorState onBack={handleBack} />;
  }

  const hasSidebar = data.duration
    || data.included_materials
    || data.target_audience
    || data.author;

  return (
    <div className="course-details">
      {/* Header */}
      <header className="course-details__header">
        <div className="course-details__header-content">
          <Breadcrumb
            ariaLabel={intl.formatMessage(messages.breadcrumbAriaLabel)}
            spacer={<span>/</span>}
            links={[
              {
                label: intl.formatMessage(messages.browseCourses),
                className: 'course-details__breadcrumb-back',
                onClick: handleBack,
              },
              {
                label: data.title || '',
                className: 'course-details__breadcrumb-current',
              },
            ]}
          />

          <div className="d-flex flex-column flex-md-row w-100 mt-md-2">
            {data.card_image_url && (
              <img
                src={data.card_image_url}
                className="course-details__image"
                alt="Course detail"
              />
            )}

            <div className="w-100">
              {data.vendor && (
                <p className="course-details__vendor">{data.vendor}</p>
              )}
              {data.title && (
                <h1 className="course-details__title">{data.title}</h1>
              )}
              {data.enrollment_url && (
                <Button
                  as="a"
                  href={data.enrollment_url}
                  className="course-details__title-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage(messages.enrollButton)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="course-details__body">
        <main className="course-details__content">
          {data.overview && (
            <section className="course-details__section">
              <h2>{intl.formatMessage(messages.overviewTitle)}</h2>
              {parseHtml(data.overview)}
            </section>
          )}

          {data.learning_objectives && (
            <section className="course-details__section">
              <h2>{intl.formatMessage(messages.learningObjectivesTitle)}</h2>
              {parseHtml(data.learning_objectives)}
            </section>
          )}

          {data.outline && (
            <section className="course-details__section">
              <h2>{intl.formatMessage(messages.courseOutlineTitle)}</h2>
              {parseHtml(data.outline)}
            </section>
          )}

          {data.prerequisites && (
            <section className="course-details__section">
              <h2>{intl.formatMessage(messages.prerequisitesTitle)}</h2>
              {parseHtml(data.prerequisites)}
            </section>
          )}
        </main>

        {hasSidebar && (
          <aside className="course-details__sidebar">
            <div className="course-details__sidebar-card">
              {data.duration && (
                <div className="course-details__sidebar-item">
                  <span className="course-details__sidebar-label">
                    <i className="fa-regular fa-clock mr-2" />
                    {intl.formatMessage(messages.durationLabel)}
                  </span>
                  <div className="course-details__sidebar-value">
                    {parseHtml(data.duration)}
                  </div>
                </div>
              )}

              {!!data.included_materials && (
                <div className="course-details__sidebar-item">
                  <span className="course-details__sidebar-label">
                    <i className="fa-regular fa-book mr-2" />
                    {intl.formatMessage(messages.includedMaterialsLabel)}
                  </span>
                  <ul className="course-details__materials-list">
                    {(Array.isArray(data.included_materials)
                      ? data.included_materials
                      : data.included_materials
                        .split('\n')
                        .map((s: string) => s.trim())
                        .filter(Boolean)
                    ).map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {data.target_audience && (
                <div className="course-details__sidebar-item">
                  <span className="course-details__sidebar-label">
                    <i className="fa-regular fa-certificate mr-2" />
                    {intl.formatMessage(messages.targetAudienceLabel)}
                  </span>
                  <div className="course-details__sidebar-value">
                    {parseHtml(data.target_audience)}
                  </div>
                </div>
              )}

              {data.author && (
                <div className="course-details__sidebar-item">
                  <span className="course-details__sidebar-label">
                    <i className="fa-regular fa-user mr-2" />
                    {intl.formatMessage(messages.authorLabel)}
                  </span>
                  <div className="course-details__sidebar-value">
                    {parseHtml(data.author)}
                  </div>
                </div>
              )}

            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Details;
