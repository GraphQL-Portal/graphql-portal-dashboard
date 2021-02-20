export const filterObjectByList = (list: string[]) => (
  object: Record<string, any>
) =>
  list.reduce((acc: Record<string, any>, item: string) => {
    const filteredItem = object[item];
    if (!!filteredItem) acc[item] = filteredItem;
    return acc;
  }, {});
