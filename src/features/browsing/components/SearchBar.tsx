import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Spinner } from '@edx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

import { CatalogContext } from 'app/providers/CatalogProvider';
import messages from './messages';

type SubmitButtonProps = {
  disabled: boolean;
  clearInput?: () => void;
};

const InputButtons = ({ disabled, clearInput }: SubmitButtonProps) => (
  <div className="d-flex">
    {
      !disabled && (
        <button
          type="button"
          className="search-clear-button"
          onClick={clearInput}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )
    }

    <button
      type="submit"
      className={`search-submit-button ${disabled ? 'search-disabled' : 'search-enabled'}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  </div>
);

const SearchBar = () => {
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(false);
  const { search, setSearch } = useContext(CatalogContext);
  const isDisabled = loading || search.trim().length === 0;

  const handleInputClear = () => setSearch('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const submitSearch = (e: React.FormEvent) => {
    if (isDisabled) { return; }

    e.preventDefault();

    setLoading(true);

    // eslint-disable-next-line no-console
    console.log('Search value:', search.trim());

    setTimeout(() => {
      setLoading(false);
    }, 5000);
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
              disabled={loading}
              leadingElement={<FontAwesomeIcon icon={faSearch} />}
              trailingElement={
                loading ? (
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
              floatingLabel={formatMessage(messages.placeholder)}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
