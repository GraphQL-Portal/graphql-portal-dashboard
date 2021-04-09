import React, { useEffect, useState } from 'react';
import { ArrowForward } from '@material-ui/icons';
import ReactTour, { ReactourStep } from 'reactour';
import { selectors } from './constants';
import { useTourContext } from '../../model/providers';
import { useStyles } from './useStyles';
import { useTheme } from '@material-ui/core';

const getDomNode = (selector: string) => document.querySelector(selector);
const getDataIntroSelector = (selector: string): string =>
  `[data-intro="${selector}"]`;
const stopPropagation = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};
const stopPropagationAction = (node: any) => {
  node.addEventListener('click', stopPropagation);
};

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
        'Dashboard tab. Here you can see metrics and charts of your apis.',
      style,
      selector: getDataIntroSelector(selectors.NAVIGATION_DASHBOARD),
    },
    {
      content: 'API Tab. Here you can manage your apis.',
      style,
      selector: getDataIntroSelector(selectors.NAVIGATION_MY_APIS),
    },
    {
      content:
        'Data Sources tab. It contains available and created by you data sources. Here you can manage your created data sources.',
      style,
      selector: getDataIntroSelector(selectors.NAVIGATION_MY_DATA_SOURCES),
    },
    {
      content:
        'This is profile tab. Here you can manage you profile information, reset, edit your password.',
      style,
      selector: getDataIntroSelector(selectors.NAVIGATION_YOUR_PROFILE),
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
      selector: getDataIntroSelector(selectors.NAVIGATION_MY_DATA_SOURCES),
    },
    {
      content: "This is search bar. Let's find openapi data connector.",
      style,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_AVAILABLE),
      action: stopPropagationAction,
    },
    {
      content: 'We have found open api.',
      style,
      action(node) {
        node.addEventListener('click', stopPropagation);
        if (!tour.DATA_CONNECTORS_SEARCH_VALUE) {
          setTourField('DATA_CONNECTORS_SEARCH_VALUE', 'openapi');
        }
      },
      selector: getDataIntroSelector(selectors.DATA_SOURCE_AVAILABLE),
    },
    {
      content: 'Click here to create.',
      style,
      selector: getDataIntroSelector(selectors.OPEN_API),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_ADD_WIDGET)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        'There is form where you can set name of you data source. Name should be unique. Let\'s use "Pets data source" for example.',
      style,
      position: [10, 110],
      action: stopPropagationAction,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_ADD_WIDGET),
    },
    {
      content: "Don't forget to save it!",
      style,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_NAME_SAVE_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_ADD_WIDGET)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        'We will use petstore openAPI for example. So we have pass URL of swagger file, Base URL and format of swagger file. Also we can apply some headers (JWT Tokens) if its required. See documentation for more information...',
      style,
      position: [20, 50],
      action: stopPropagationAction,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_ADD_WIDGET),
    },
    {
      content: 'Of course we have to save it!',
      style,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_HANDLER_SAVE_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_ADD_WIDGET)
        );
      },
      buttonDisabled: true,
    },
    {
      content: 'Here we can apply some transforms. We can skip it now!',
      style,
      position: [20, 50],
      action: stopPropagationAction,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_ADD_WIDGET),
    },
    {
      content: '*Epic drums sound* (Click here...)',
      style,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_ADD_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.DATA_SOURCE_MY_CONNECTED)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        "Well done! Now source is displaying here. Here you can edit or delete it. But we won't do that, let's create API and use it!",
      style,
      action: stopPropagationAction,
      selector: getDataIntroSelector(selectors.DATA_SOURCE_MY_CONNECTED),
    },
    {
      content: 'Go to my APIS, click here.',
      style,
      selector: getDataIntroSelector(selectors.NAVIGATION_MY_APIS),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_CREATE_NEW_BUTTON)
        );
      },
      buttonDisabled: true,
    },
    {
      content: 'And here..',
      style,
      selector: getDataIntroSelector(selectors.MY_APIS_CREATE_NEW_BUTTON),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_CREATE_FORM)
        );
      },
      buttonDisabled: true,
    },
    {
      content: 'Here is form...',
      style,
      action: stopPropagationAction,
      position: [20, 50],
      selector: getDataIntroSelector(selectors.MY_APIS_CREATE_FORM),
    },
    {
      content: 'We selected our created pet data source.',
      style,
      action: stopPropagationAction,
      selector: getDataIntroSelector(
        selectors.MY_APIS_CREATE_FORM_SELECT_DATA_SOURCE
      ),
    },
    {
      content: 'Click here to add it.',
      style,
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_CREATE_FORM_CREATE_NEW_BUTTON)
        );
      },
      buttonDisabled: true,
      selector: getDataIntroSelector(
        selectors.MY_APIS_CREATE_FORM_ADD_DATA_SOURCE_BUTTON
      ),
    },
    {
      content: "That's all! Save it!",
      style,
      selector: getDataIntroSelector(
        selectors.MY_APIS_CREATE_FORM_CREATE_NEW_BUTTON
      ),
      action(node) {
        addOnceListenerToNode(node, () => goToNextStep(selectors.MY_APIS_LIST));
      },
      buttonDisabled: true,
    },
    {
      content:
        "Here you can see some information about you apis, also you can update or delete. Let's do some requests!",
      style,
      action: stopPropagationAction,
      selector: getDataIntroSelector(selectors.MY_APIS_LIST),
    },
    {
      content: 'Click on api name to see schema and playground.',
      style,
      selector: getDataIntroSelector(selectors.MY_APIS_CREATED_API_LINK),
      action(node) {
        addOnceListenerToNode(node, () =>
          goToNextStep(selectors.MY_APIS_EXAMPLE_API)
        );
      },
      buttonDisabled: true,
    },
    {
      content:
        'Now you can look at schema in schemas tab. And test you api with playground. Just click on "play button" and you will see response! That\'s all! Simple is not it?',
      style,
      selector: getDataIntroSelector(selectors.MY_APIS_EXAMPLE_API),
    },
  ];

  const waitUntilNextStepElementAppears = (
    selector: string | undefined,
    callback: () => void
  ) => {
    if (!selector) return callback();
    if (getDomNode(getDataIntroSelector(selector))) {
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
    <ReactTour
      className={tourWrapper}
      steps={steps}
      isOpen={tour.isStarted}
      goToStep={currentStep}
      nextStep={() => goToNextStep()}
      nextButton={nextButton}
      prevButton={emptyElement}
      disableDotsNavigation={true}
      accentColor={palette.primary.dark}
      closeWithMask={false}
      showNavigation={false}
      badgeContent={(current, total) => `${current}/${total}`}
      lastStepNextButton={emptyElement}
      onRequestClose={endTour}
    />
  );
};
