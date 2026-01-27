import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import { useIntl } from 'react-intl';
import { Form, Button, Collapsible } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { CatalogItem } from 'shared/types';
import messages from 'features/browsing/components/messages';

interface Props {
  title: string;
  items: ReadonlyArray<CatalogItem>;
  selectedItems: CatalogItem[];
  onSelectionChange: (items: CatalogItem[]) => void;
}

const MAX_VISIBLE_ITEMS = 10;

const FilterSection: React.FC<Props> = ({
  title,
  items,
  selectedItems,
  onSelectionChange,
}) => {
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);
  const selectedIds = useMemo(
    () => new Set(selectedItems.map((i) => i.id)),
    [selectedItems],
  );

  const visibleItems = showAll ? items : items.slice(0, MAX_VISIBLE_ITEMS);

  const hasMore = items.length > MAX_VISIBLE_ITEMS;

  const toggleItem = (item: CatalogItem) => {
    onSelectionChange(
      selectedIds.has(item.id)
        ? selectedItems.filter((i) => i.id !== item.id)
        : [...selectedItems, item],
    );
  };

  return (
    <section className="filter-group mb-3">
      <hr className="my-3 filters-separator" />

      <Collapsible
        title={title}
        defaultOpen
        styling="basic"
        className="filter-collapsible"
      >
        <section className="filter-list pt-2">
          {visibleItems.map((item) => {
            const checked = selectedIds.has(item.id);

            return (
              <Form.Checkbox
                key={item.id}
                checked={checked}
                onChange={() => toggleItem(item)}
                className="mb-2 checkbox-option ml-3"
              >
                {checked && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="checkbox-icon mr-2"
                  />
                )}
                {item.name}
              </Form.Checkbox>
            );
          })}

          {hasMore && (
            <Button
              variant="link"
              size="sm"
              className="p-0 mt-2 text-decoration-none button-display-toggle"
              onClick={() => setShowAll((v) => !v)}
            >
              <FontAwesomeIcon
                icon={showAll ? faMinus : faPlus}
                className="mr-2"
              />
              {intl.formatMessage(
                showAll ? messages.showLess : messages.showMore,
              )}
            </Button>
          )}
        </section>
      </Collapsible>

      <Select
        isMulti
        name={title}
        className="basic-multi-select mt-2"
        classNamePrefix="react-select"
        placeholder={title}
        options={items.map(({ id, name }) => ({
          value: id,
          label: name,
        }))}
        value={selectedItems.map(({ id, name }) => ({
          value: id,
          label: name,
        }))}
        onChange={(options) => onSelectionChange(
          (options ?? []).map(({ value, label }) => ({
            id: value,
            name: label,
          })),
        )}
      />
    </section>
  );
};

export default FilterSection;
