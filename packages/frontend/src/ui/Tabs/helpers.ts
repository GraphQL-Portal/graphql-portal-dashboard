const getId = (index: number) => `full-width-tab-${index}`;
const getControl = (index: number) => `full-width-tabpanel-${index}`;

export const getControlProps = (index: number) => ({
  id: getId(index),
  'aria-controls': getControl(index),
});

export const getTabPanelProps = (index: number) => ({
  id: getControl(index),
  'aria-labelledby': getId(index),
});
