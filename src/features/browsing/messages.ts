import { defineMessages } from 'react-intl';

const messages = defineMessages({
  filters: {
    id: 'catalog.filters.title',
    defaultMessage: 'Filters',
  },
  filterBy: {
    id: 'catalog.filters.filterBy',
    defaultMessage: 'Filter by',
  },
  clearAll: {
    id: 'catalog.filters.clearAll',
    defaultMessage: 'Clear all',
  },
  resultsCount: {
    id: 'catalog.results.count',
    defaultMessage: '{start} - {end} of {count} results',
  },
  errorTitle: {
    id: 'catalog.results.errorTitle',
    defaultMessage: 'Something went wrong.',
  },
  errorMessage: {
    id: 'catalog.results.errorMessage',
    defaultMessage: 'An error occurred while loading the courses. Please try again.',
  },
  errorMessageWithCount: {
    id: 'catalog.results.errorMessageWithCount',
    defaultMessage: '0 results',
  },
  emptyTitle: {
    id: 'catalog.results.emptyTitle',
    defaultMessage: "We couldn't find anything.",
  },
  emptyMessage: {
    id: 'catalog.results.emptyMessage',
    defaultMessage: 'Try searching for something else or change your filters.',
  },
});

export default messages;
