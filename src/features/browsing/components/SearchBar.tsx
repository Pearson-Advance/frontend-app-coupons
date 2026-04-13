import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Form, Spinner } from '@openedx/paragon';

import { CatalogContext } from 'app/providers/CatalogProvider';
import messages from './messages';

type InputButtonsProps = {
  disabled: boolean;
  clearInput?: () => void;
};

const InputButtons = ({ disabled, clearInput }: InputButtonsProps) => (
  <div className="d-flex">
    {
    !disabled && (
      <button
        type="button"
        className="search-clear-button"
        onClick={clearInput}
      >
        <i className="fa-regular fa-xmark" />
      </button>
    )
}

    <button
      type="submit"
      className={`search-submit-button ${disabled ? 'search-disabled' : 'search-enabled'}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <i className="fa-regular fa-arrow-right" />
    </button>
  </div>
);

const SearchBar = () => {
  const { formatMessage } = useIntl();
  const {
    search,
    setSearch,
    commitSearch,
    isLoading,
  } = useContext(CatalogContext);

  const isDisabled = isLoading || search.trim().length === 0;

  const handleInputClear = () => {
    setSearch('');
    commitSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) { return; }
    commitSearch();
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-background" />
      <div className="search-input-container">
        <h2>{formatMessage(messages.title)}</h2>
        <p>{formatMessage(messages.description)}</p>

        <Form onSubmit={submitSearch}>
          <Form.Group>
            <Form.Control
              value={search}
              onChange={handleInputChange}
              disabled={isLoading}
              leadingElement={<i className="fa-regular fa-magnifying-glass" />}
              trailingElement={
                isLoading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    className="mr-3"
                    screenReaderText={formatMessage(messages.loading)}
                  />
                ) : (
                  <InputButtons disabled={isDisabled} clearInput={handleInputClear} />
                )
              }
              placeholder={formatMessage(messages.placeholder)}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
