import React from 'react';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
  getConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import appMessages from 'i18n';
import Footer from '@edx/frontend-component-footer';

import Browsing from 'features/browsing';
import Details from 'features/details';
import CouponError from 'features/error';
import { Header } from 'react-paragon-topaz';
import HeaderLogo from 'assets/svg/header-logo.svg';
import { CatalogProvider } from 'app/providers/CatalogProvider';
import { validateUuid } from 'shared/helpers';

import './index.scss';

const queryClient = new QueryClient();

/**
 * Validates required route parameters before rendering the catalog flow.
 *
 * This function acts as a guard clause for the route. The application
 * depends on a valid `catalogID` to fetch catalog data and optionally
 * a well-formed `coupon_code` to apply pricing logic. Without these
 * values, the catalog cannot be resolved, and the downstream components
 * would either fail or enter an inconsistent state.
 *
 * If the catalog ID is not a valid UUID, the system cannot determine
 * which catalog to load. If the coupon code is present but malformed,
 * it cannot be safely processed or validated server-side.
 *
 * In either case, rendering the main flow would be meaningless because
 * the required context to initialize the data layer does not exist.
 * Therefore, the user is redirected to the error route immediately.
 *
 * This ensures:
 * - No invalid API calls are triggered.
 * - The application fails fast and predictably.
 */
function renderValidatedCatalogRoute(match, location, Component) {
  const params = new URLSearchParams(location.search);
  const hasCouponParam = params.has('coupon_code');
  const couponCode = params.get('coupon_code');

  const isValidCatalog = validateUuid(match.params.catalogID);
  const isValidCoupon = hasCouponParam && (couponCode !== null && couponCode.length > 0 && /^[A-Z0-9_-]+$/.test(couponCode));

  if (!isValidCatalog || !isValidCoupon) {
    return <Redirect to="/error" />;
  }

  return (
    <CatalogProvider>
      <Component />
    </CatalogProvider>
  );
}

subscribe(APP_READY, () => {
  ReactDOM.render(
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter basename={getConfig().ENTERPRISE_COUPONS_PATH}>
            <Header src={HeaderLogo} />
            <Switch>
              <Route exact path="/error">
                <CouponError />
              </Route>
              <Route
                exact
                path="/catalog/:catalogID"
                render={({ match, location }) => renderValidatedCatalogRoute(match, location, Browsing)}
              />
              <Route
                exact
                path="/catalog/:catalogID/:courseKey"
                render={({ match, location }) => renderValidatedCatalogRoute(match, location, Details)}
              />
              <Redirect to="/error" />
            </Switch>
            <Footer />
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
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
  requireAuthenticatedUser: false,
});
