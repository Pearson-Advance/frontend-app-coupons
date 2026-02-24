import { useIntl } from 'react-intl';

import messages from 'features/error/messages';
import './index.scss';

const ErrorPage = () => {
  const intl = useIntl();

  return (
    <div className="catalog-error-page">
      <h1>
        {intl.formatMessage(messages.errorTitle)}
      </h1>

      <p>
        {intl.formatMessage(messages.errorDescription)}
      </p>
    </div>
  );
};

export default ErrorPage;
