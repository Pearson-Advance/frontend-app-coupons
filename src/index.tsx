import { createRoot } from 'react-dom/client';

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
  getConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import PropTypes from 'prop-types';

import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import appMessages from 'i18n';
import Footer from '@edx/frontend-component-footer';

import Browsing from 'features/browsing';
import Details from 'features/details';
import CouponError from 'features/error';
import { Header, Banner } from 'react-paragon-topaz';
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
const ValidatedCatalogRoute = ({ Component }) => {
  const params = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const hasCouponParam = searchParams.has('coupon_code');
  const couponCode = searchParams.get('coupon_code');

  const isValidCatalog = validateUuid(params.catalogID);
  const isValidCoupon = hasCouponParam && !!couponCode && couponCode.length > 0 && /^[A-Z0-9_-]+$/.test(couponCode);

  if (!isValidCatalog || !isValidCoupon) {
    return <Navigate to="/error" replace />;
  }

  return (
    <CatalogProvider>
      <Component />
    </CatalogProvider>
  );
};

ValidatedCatalogRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

const App = () => {
  const bannerText = getConfig().MAINTENANCE_BANNER_TEXT || '';

  return (
    <IntlProvider locale="en">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Header src={HeaderLogo} />
          {bannerText && (
            <Banner variant="warning" iconWarning text={bannerText} />
          )}
          <Routes>
            <Route path="/error" element={<CouponError />} />
            <Route
              path="/catalog/:catalogID"
              element={<ValidatedCatalogRoute Component={Browsing} />}
            />
            <Route
              path="/catalog/:catalogID/:courseKey"
              element={<ValidatedCatalogRoute Component={Details} />}
            />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>
          <Footer />
        </AppProvider>
      </QueryClientProvider>
    </IntlProvider>
  );
};

const root = createRoot(document.getElementById('root'));

subscribe(APP_READY, () => {
  root.render(<App />);
});

subscribe(APP_INIT_ERROR, (error) => {
  root.render(<ErrorPage message={error.message} />);
});

initialize({
  messages: [appMessages],
  requireAuthenticatedUser: false,
  handlers: {
    auth: async () => {},
  },
});
