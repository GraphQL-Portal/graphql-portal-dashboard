export const getDomNode = (selector: string) =>
  document.querySelector(selector);

export const getDataTourSelector = (selector: string): string =>
  `[data-tour="${selector}"]`;

export const stopPropagation = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
};

export const stopPropagationAction = (node: any) => {
  node.addEventListener('click', stopPropagation);
};
