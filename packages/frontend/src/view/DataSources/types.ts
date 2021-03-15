type DataSource = {
  title: string;
  type: string;
  description: string;
};

export type AvailableList = {
  list: DataSource[];
};

export type Source = {
  connector?: {
    properties?: {
      [key: string]: unknown;
    };
  };
};
