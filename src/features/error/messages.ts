import { defineMessages } from 'react-intl';

const messages = defineMessages({
  errorTitle: {
    id: 'catalog.error.title',
    defaultMessage: 'Error: Unable to Load Catalog',
  },
  errorDescription: {
    id: 'catalog.error.description',
    defaultMessage:
      'The catalog identifier or coupon code provided in the URL is invalid. Please review the link and try again.',
  },
});

export default messages;
