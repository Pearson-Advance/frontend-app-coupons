import { Breadcrumb } from '@edx/paragon';
import { Button } from 'react-paragon-topaz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faBook, faCertificate, faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useIntl } from 'react-intl';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { RouteParams } from 'shared/types';
import PageSkeleton from 'features/details/components/Skeleton';
import ErrorState from 'features/details/components/Error';
import useCourseDetail from 'hooks/useCourseDetail';
import { parseHtml } from 'shared/helpers';
import messages from './messages';
import './index.scss';

const Details = () => {
  const intl = useIntl();
  const history = useHistory();
  const { catalogID, courseKey } = useParams<RouteParams>();
  const { data, isLoading } = useCourseDetail(catalogID, courseKey);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const couponCode = params.get('coupon_code');

  const handleBack = () => history.push(`/catalog/${catalogID}/?coupon_code=${couponCode}`);

  if (isLoading) { return <PageSkeleton />; }
  if (!data || Object.keys(data).length === 0) { return <ErrorState onBack={handleBack} />; }

  const hasSidebar = data.duration
    || data.included_materials?.length
    || data.target_audience
    || data.author;

  return (
    <div className="course-details">

      {/* ── Header ── */}
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
      </header>

      {/* ── Body ── */}
      <div className="course-details__body">

        {/* Main content */}
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

        {/* Sidebar — single card */}
        {hasSidebar && (
          <aside className="course-details__sidebar">
            <div className="course-details__sidebar-card">

              {data.duration && (
                <div className="course-details__sidebar-item">
                  <span className="course-details__sidebar-label">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {intl.formatMessage(messages.durationLabel)}
                  </span>
                  <div className="course-details__sidebar-value">
                    {parseHtml(data.duration)}
                  </div>
                </div>
              )}

              {!!data.included_materials?.length && (
                <div className="course-details__sidebar-item">
                  <span className="course-details__sidebar-label">
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    {intl.formatMessage(messages.includedMaterialsLabel)}
                  </span>
                  <ul className="course-details__materials-list">
                    {data.included_materials.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {data.target_audience && (
                <div className="course-details__sidebar-item">
                  <span className="course-details__sidebar-label">
                    <FontAwesomeIcon icon={faCertificate} className="mr-2" />
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
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
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
