import { Skeleton } from '@edx/paragon';

const CourseHeaderSkeleton = () => (
  <header className="course-details__header">
    <div className="course-details__header-content">
      <Skeleton height={18} width={220} />
      <Skeleton height={16} width={140} className="course-details__skeleton-gap--sm" />
      <Skeleton height={36} width={420} className="course-details__skeleton-gap--md" />
      <Skeleton height={40} width={140} className="course-details__skeleton-gap--md" />
    </div>
  </header>
);

const CourseBodySkeleton = () => (
  <div className="course-details__body">
    <main className="course-details__content">
      <section className="course-details__section">
        <Skeleton height={20} width={180} className="course-details__skeleton-gap--sm" />
        <Skeleton count={6} height={16} className="course-details__skeleton-gap--sm" />
      </section>
      <section className="course-details__section">
        <Skeleton height={24} width={200} className="course-details__skeleton-gap--sm" />
        <Skeleton count={3} height={16} className="course-details__skeleton-gap--sm" />
      </section>
      <section className="course-details__section">
        <Skeleton height={24} width={160} className="course-details__skeleton-gap--sm" />
        <Skeleton count={5} height={16} className="course-details__skeleton-gap--sm" />
      </section>
    </main>

    <aside className="course-details__sidebar">
      <div className="course-details__sidebar-card">
        <Skeleton height={20} width={180} className="course-details__skeleton-gap--sm" />
        <Skeleton height={16} width={120} />
        <Skeleton height={20} width={200} className="course-details__skeleton-gap--sm" />
        <Skeleton count={4} height={14} className="course-details__skeleton-gap--sm" />
        <Skeleton count={3} height={16} className="course-details__skeleton-gap--sm" />
        <Skeleton height={20} width={180} className="course-details__skeleton-gap--sm" />
        <Skeleton height={16} width={120} />
        <Skeleton height={20} width={200} className="course-details__skeleton-gap--sm" />
        <Skeleton count={4} height={14} className="course-details__skeleton-gap--sm" />
      </div>
    </aside>
  </div>
);

const PageSkeleton = () => (
  <div className="course-details">
    <CourseHeaderSkeleton />
    <CourseBodySkeleton />
  </div>
);

export default PageSkeleton;
