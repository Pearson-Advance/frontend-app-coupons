import { useContext } from 'react';
import {
  Button,
  Chip,
  Collapsible,
  Pagination,
} from '@edx/paragon';
import { useIntl } from 'react-intl';

import { CatalogItem, ItemType } from 'shared/types';
import SearchBar from 'features/browsing/components/SearchBar';
import {
  FILTER_ITEM_TYPES,
  TOPICS,
  VENDORS,
  PAGE_SIZE,
} from 'shared/constants';
import FilterSection from 'features/browsing/components/FilterSection';

import messages from 'features/browsing/messages';
import { CatalogContext } from 'app/providers/CatalogProvider';
import CourseCard from 'features/browsing/components/CourseCard';
import './index.scss';

const RemoveIcon = () => <i className="fa-light fa-xmark" />;

const Browsing = () => {
  const intl = useIntl();
  const {
    topics,
    vendors,
    page,
    data,
    isLoading,
    isError,
    setTopics,
    setVendors,
    setPage,
    clearAll,
  } = useContext(CatalogContext);

  const totalSelected = topics.length + vendors.length;

  const chips: Array<CatalogItem & { type: ItemType }> = [
    ...topics.map((item) => ({ ...item, type: FILTER_ITEM_TYPES.TOPICS })),
    ...vendors.map((item) => ({ ...item, type: FILTER_ITEM_TYPES.VENDORS })),
  ];

  const removeItem = (type: ItemType, id: string) => {
    const updater = (items: CatalogItem[]) => items.filter((i) => i.id !== id);

    return type === FILTER_ITEM_TYPES.TOPICS ? setTopics(updater) : setVendors(updater);
  };

  const totalCount = data?.count ?? 0;
  const pageCount = totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 0;
  const hasNavigation = pageCount > 1;
  const start = totalCount > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
  const end = Math.min(page * PAGE_SIZE, totalCount);

  const renderFilters = () => (
    <>
      <FilterSection
        title="Topics"
        items={TOPICS}
        selectedItems={topics}
        onSelectionChange={setTopics}
      />
      <FilterSection
        title="Vendors"
        items={VENDORS}
        selectedItems={vendors}
        onSelectionChange={setVendors}
      />
    </>
  );

  return (
    <main className="main-layout">
      <SearchBar />
      <section className="section-content">
        <aside className="div-filters">
          <div className="catalog-filters-container">
            <div className="mobile-filters">
              <Collapsible
                styling="card"
                title={(
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center filter-mobile-icon">
                      <i className="fa-solid fa-bars-filter" />
                      <span>{intl.formatMessage(messages.filters)}</span>
                    </div>
                    {!!totalSelected && (
                      <span className="span-filter-counter">
                        {totalSelected}
                      </span>
                    )}
                  </div>
                )}
              >
                <div className="p-3">{renderFilters()}</div>
              </Collapsible>
            </div>

            <div className="desktop-filters">
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h3 className="m-0 h4 h4-filter-by">
                  {intl.formatMessage(messages.filterBy)}
                </h3>

                {!!totalSelected && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={clearAll}
                    className="button-clear-filters"
                  >
                    {intl.formatMessage(messages.clearAll)}
                  </Button>
                )}
              </div>

              {!!totalSelected && (
                <div className="mb-3 active-filters-chips">
                  {chips.map(({ id, name, type }) => (
                    <Chip
                      key={id}
                      iconAfter={RemoveIcon}
                      onIconAfterClick={() => removeItem(type, id)}
                      iconAfterAlt="remove"
                    >
                      {name}
                    </Chip>
                  ))}
                </div>
              )}

              {renderFilters()}
            </div>
          </div>
        </aside>

        <div className="pt-2 div-results">
          {!isLoading && data?.results?.length > 0 && (
            <p>
              {intl.formatMessage(messages.resultsCount, { start, end, count: data.count })}
            </p>
          )}

          {isLoading && Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
            <CourseCard key={i} isLoading />
          ))}

          {((!isLoading && isError) || (!isLoading && !data?.results)) && (
            <div className="flex-column d-flex">
              <p>
                {intl.formatMessage(messages.errorMessageWithCount)}
              </p>
              <h3>{intl.formatMessage(messages.errorTitle)}</h3>
              <p>
                {intl.formatMessage(messages.errorMessage)}
              </p>
            </div>
          )}

          {!isLoading && !isError && data?.results?.length === 0 && (
          <div className="flex-column d-flex">
            <p>
              {intl.formatMessage(messages.errorMessageWithCount)}
            </p>
            <h3>{intl.formatMessage(messages.emptyTitle)}</h3>
            <p>
              {intl.formatMessage(messages.emptyMessage)}
            </p>
          </div>
          )}

          {!isLoading && !isError && data?.results?.map(course => (
            <CourseCard
              key={course.key}
              title={course.title}
              vendor={course.vendor}
              imageUrl={course.card_image_url}
              enrolmentUrl={course.enrollment_url ?? '#'}
              courseKey={course.key}
            />
          ))}

          {!isLoading && !isError && hasNavigation && (
            <div className="pagination-container">
              <Pagination
                className="mb-0"
                paginationLabel="pagination navigation"
                pageCount={pageCount}
                currentPage={page}
                variant="reduced"
                size="small"
                onPageSelect={(selectedPage: number) => {
                  if (!data?.next && selectedPage > page) { return; }
                  setPage(selectedPage);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Browsing;
