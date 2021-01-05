type Obj = {
  [key: string]: any;
};

export const getPath = (obj: Obj) => (path: string[]) =>
  path.reduce((acc: Obj, key: string) => acc[key], obj);
