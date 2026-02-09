import { useContext } from 'react';
import { Button, Chip, Collapsible } from '@edx/paragon';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { CatalogItem, ItemType } from 'shared/types';
import { FILTER_ITEM_TYPES, VENDORS } from 'shared/constants';
import FilterSection from 'features/browsing/components/FilterSection';

import messages from 'features/browsing/messages';
import { CatalogContext } from 'app/providers/CatalogProvider';
import CourseCard from 'features/browsing/components/CourseCard';
import './index.scss';

const RemoveIcon = () => <FontAwesomeIcon icon={faXmark} />;

const Browsing = () => {
  const intl = useIntl();
  const {
    vendors,
    setVendors,
    clearAll,
  } = useContext(CatalogContext);

  const totalSelected = vendors.length;

  const chips: Array<CatalogItem & { type: ItemType }> = [
    ...vendors.map((item) => ({ ...item, type: FILTER_ITEM_TYPES.VENDORS })),
  ];

  const removeItem = (id: string) => {
    const updater = (items: CatalogItem[]) => items.filter((i) => i.id !== id);

    return setVendors(updater);
  };

  const renderFilters = () => (
    <FilterSection
      title="Vendors"
      items={VENDORS}
      selectedItems={vendors}
      onSelectionChange={setVendors}
    />
  );

  return (
    <main className="main-layout">
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="h4 m-0 h4-filter-by">
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
                <div className="active-filters-chips mb-3">
                  {chips.map(({ id, name }) => (
                    <Chip
                      key={id}
                      iconAfter={RemoveIcon}
                      onIconAfterClick={() => removeItem(id)}
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

        <div className="div-results">
          <CourseCard
            imageUrl="https://picsum.photos/id/237/200/300"
            title="AWS Certified Security Specialty (SCS-C02)"
            vendor="AWS"
            duration="24 hours"
            enrolmentUrl="https://example.com/enroll"
          />
        </div>
      </section>
    </main>
  );
};

export default Browsing;
