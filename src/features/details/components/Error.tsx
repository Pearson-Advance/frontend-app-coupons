import { Button } from 'react-paragon-topaz';
import { Breadcrumb } from '@openedx/paragon';
import { useIntl } from 'react-intl';

import messages from 'features/details/messages';

interface ErrorStateProps {
  onBack: () => void;
}

const ErrorState = ({ onBack }: ErrorStateProps) => {
  const intl = useIntl();

  return (
    <div className="course-details">
      <header className="course-details__header">
        <div className="course-details__header-content">
          <Breadcrumb
            ariaLabel={intl.formatMessage(messages.breadcrumbAriaLabel)}
            spacer={<span>/</span>}
            links={[
              {
                label: intl.formatMessage(messages.browseCourses),
                className: 'course-details__breadcrumb-back',
                onClick: onBack,
              },
            ]}
          />
        </div>
      </header>

      <div className="course-details__error">
        <h2 className="course-details__error-title">
          {intl.formatMessage(messages.errorTitle)}
        </h2>
        <p className="course-details__error-message">
          {intl.formatMessage(messages.errorMessage)}
        </p>
        <Button
          variant="outline-primary"
          className="course-details__error-action"
          onClick={onBack}
        >
          {intl.formatMessage(messages.backButton)}
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
