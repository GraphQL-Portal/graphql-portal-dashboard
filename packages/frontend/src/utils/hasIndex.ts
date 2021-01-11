type Entity = {
  indexOf(item: any): number;
};

export const hasIndex = (value: any) => (item: Entity) => item.indexOf(value) !== -1;
