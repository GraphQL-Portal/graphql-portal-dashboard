import React, { useEffect, useState } from 'react';
import { ArrowForward } from '@material-ui/icons';
import ReactTour, { ReactourStep } from 'reactour';
import { selectors } from './constants';
import { useTourContext } from '../../model/providers';
import { useStyles } from './useStyles';
import { useTheme } from '@material-ui/core';
import { StartTour } from './StartTour';
import {
  getDataTourSelector,
  getDomNode,
  stopPropagation,
  stopPropagationAction,
} from './helpers';

let interval: NodeJS.Timeout;

export const Tour: React.FC = () => {
  const { palette } = useTheme();
  const { tour, setTourField, endTour } = useTourContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(false);
  const { disabledNextStepButton, nextStepButton, tourWrapper } = useStyles();

  const style = {
    backgroundColor: palette.background.default,
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const steps: Array<ReactourStep & { buttonDisabled?: boolean }> = [
    {
      content:
        "Dashboard tab. Here you can see a quick summary of your API's metrics.",
      style,
      selector: getDataTourSelector(selectors.NAVIGATION_DASHBOARD),
    },
    {
      content: 'API tab. Here you can manage your APIs.',
      style,
      selector: getDataTourSelector(selectors.NAVIGATION_MY_APIS),
    },
    {
      content: 'Data Sources tab. Create and manage your data sources here.',
      style,
      selector: getDataTourSelector(selectors.NAVIGATION_MY_DATA_SOURCES),
    },
    {
      content:
        'User Profile tab. Manage you profile information, reset and edit your password.',
      style,
      selector: getDataTourSelector(selectors.NAVIGATION_YOUR_PROFILE),
    },
    {
      content: (
        <span>
          Let's create our first data source. <br />{' '}
          <b>Click at "My Data Sources"</b>.'
        </span>
      ),
      style,
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.NAVIGATION_MY_DATA_SOURCES)
        );
      },
      buttonDisabled: true,
      selector: getDataTourSelector(selectors.NAVIGATION_MY_DATA_SOURCES),
    },
    {
      content:
        "This is search bar. Click 'Next' to find and create our first data source.",
      style,
      selector: getDataTourSelector(selectors.DATA_SOURCE_AVAILABLE),
      action: stopPropagationAction,
    },
    {
      content: 'We have found OpenAPI data connector.',
      style,
      action(node) {
        node.addEventListener('click', stopPropagation);
        if (!tour.DATA_CONNECTORS_SEARCH_VALUE) {
          setTourField('DATA_CONNECTORS_SEARCH_VALUE', 'OpenAPI');
        }
      },
      selector: getDataTourSelector(selectors.DATA_SOURCE_AVAILABLE),
    },
    {
      content: 'Click here to create the data source.',
      style,
      selector: getDataTourSelector(selectors.OPEN_API),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_ADD_WIDGET)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        'On this form, we are setting the name of the data source. Note: the name should be unique.',
      style,
      position: [10, 110],
      action: stopPropagationAction,
      selector: getDataTourSelector(selectors.DATA_SOURCE_ADD_WIDGET),
    },
    {
      content: "Don't forget to save it!",
      style,
      selector: getDataTourSelector(selectors.DATA_SOURCE_NAME_SAVE_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_ADD_WIDGET)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        'On this page, we are configuring the data connector itself. In this example, we are using a PetStore OpenAPI as our data source, and we use an OpenAPI data connector to convert it to GraphQL.',
      style,
      position: [20, 50],
      action: stopPropagationAction,
      selector: getDataTourSelector(selectors.DATA_SOURCE_ADD_WIDGET),
    },
    {
      content: 'Of course we have to save it!',
      style,
      selector: getDataTourSelector(selectors.DATA_SOURCE_HANDLER_SAVE_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_ADD_WIDGET)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        'We can transform our GraphQL schema by applying various transformations. We will skip this step for now.',
      style,
      position: [20, 50],
      action: stopPropagationAction,
      selector: getDataTourSelector(selectors.DATA_SOURCE_ADD_WIDGET),
    },
    {
      content: '*Epic drums sound* (Click here...)',
      style,
      selector: getDataTourSelector(selectors.DATA_SOURCE_ADD_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_MY_CONNECTED)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        "You can find your data sources here. Now, let's create an API to use that data source.",
      style,
      action: stopPropagationAction,
      selector: getDataTourSelector(selectors.DATA_SOURCE_MY_CONNECTED),
    },
    {
      content: 'Click on "My APIs".',
      style,
      selector: getDataTourSelector(selectors.NAVIGATION_MY_APIS),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_CREATE_NEW_BUTTON)
        );
      },
      buttonDisabled: true,
    },
    {
      content: 'And click on "Create a new API".',
      style,
      selector: getDataTourSelector(selectors.MY_APIS_CREATE_NEW_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_CREATE_FORM)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        'The most important fields are the API Name and the API Endpoint.',
      style,
      action: stopPropagationAction,
      position: [20, 50],
      selector: getDataTourSelector(selectors.MY_APIS_CREATE_FORM),
    },
    {
      content: 'As well as the datasources used in this API.',
      style,
      action: stopPropagationAction,
      selector: getDataTourSelector(
        selectors.MY_APIS_CREATE_FORM_SELECT_DATA_SOURCE
      ),
    },
    {
      content: 'Click here to add our Pets data source.',
      style,
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_CREATE_FORM_CREATE_NEW_BUTTON)
        );
      },
      buttonDisabled: true,
      selector: getDataTourSelector(
        selectors.MY_APIS_CREATE_FORM_ADD_DATA_SOURCE_BUTTON
      ),
    },
    {
      content: "That's it! Now, click on 'Create new API' to save it.",
      style,
      selector: getDataTourSelector(
        selectors.MY_APIS_CREATE_FORM_CREATE_NEW_BUTTON
      ),
      action(node) {
        addOnceListenerToNode(node, () => goToNextStep(selectors.MY_APIS_LIST));
      },
      buttonDisabled: true,
    },
    {
      content:
        "You can see all your APIs on this page. You can view, edit or delete them. Let's go to the View page and do some requests with the playground.",
      style,
      action: stopPropagationAction,
      selector: getDataTourSelector(selectors.MY_APIS_LIST),
    },
    {
      content: 'Click on the API name to see its schema and the playground.',
      style,
      selector: getDataTourSelector(selectors.MY_APIS_CREATED_API_LINK),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_EXAMPLE_API)
        );
      },
      buttonDisabled: true,
    },
    {
      content: (
        <>
          That was simple, right? Visit our official documentation web-site{' '}
          <a href="https://docs.graphql-portal.com">here</a> or
          <a href="mailto:contact@code.store?subject=GraphQLPortal">
            contact us
          </a>{' '}
          if you have any questions.
        </>
      ),
      style,
      selector: getDataTourSelector(selectors.MY_APIS_EXAMPLE_API),
    },
  ];

  const addOnceListenerToNode = (
    domNode: Element | undefined,
    func: (node: Element | undefined, event?: any) => void
  ) => {
    function listener(e: any) {
      setNextButtonDisabled(false);
      func(domNode, e);
      domNode?.removeEventListener('click', listener);
    }
    domNode?.addEventListener('click', listener);
  };

  const waitUntilNextStepElementAppears = (
    selector: string | undefined,
    callback: () => void
  ) => {
    if (!selector) return callback();
    if (getDomNode(getDataTourSelector(selector))) {
      return setTimeout(() => callback(), 500);
    }
    if (interval) clearInterval(interval);
    interval = setTimeout(
      () => waitUntilNextStepElementAppears(selector, callback),
      500
    );
  };

  const goToNextStep = (selector?: string) => {
    if (isNextButtonDisabled) return;
    document
      .querySelector(steps[currentStep].selector!)
      ?.removeEventListener('click', stopPropagation);

    waitUntilNextStepElementAppears(selector, () => {
      setCurrentStep(currentStep + 1);
    });
  };

  useEffect(() => {
    setNextButtonDisabled(!!steps[currentStep].buttonDisabled);
  }, [currentStep]);

  const nextButton = (
    <span
      className={`${nextStepButton} ${
        isNextButtonDisabled ? disabledNextStepButton : ''
      }`}
    >
      {' '}
      <ArrowForward />
    </span>
  );
  const emptyElement = <div></div>;

  return (
    <>
      <StartTour />
      <ReactTour
        isOpen={tour.isStarted}
        steps={steps}
        goToStep={currentStep}
        nextStep={() => goToNextStep()}
        onRequestClose={() => endTour(currentStep === steps.length - 1)}
        closeWithMask={false}
        showNavigation={false}
        disableDotsNavigation={true}
        disableKeyboardNavigation={true}
        className={tourWrapper}
        nextButton={nextButton}
        prevButton={emptyElement}
        badgeContent={(current, total) => `${current}/${total}`}
        accentColor={palette.primary.dark}
        lastStepNextButton={emptyElement}
      />
    </>
  );
};
