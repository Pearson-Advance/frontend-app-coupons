import React from 'react';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import Footer from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';

import appMessages from 'i18n';
import Browsing from 'features/browsing';
import { CatalogProvider } from 'app/providers/CatalogProvider';
import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <IntlProvider locale="en">
      <AppProvider>
        <CatalogProvider>
          <Header />
          <Browsing />
          <Footer />
        </CatalogProvider>
      </AppProvider>
    </IntlProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById('root'),
  );
});

initialize({
  messages: [appMessages],
  requireAuthenticatedUser: true,
});
