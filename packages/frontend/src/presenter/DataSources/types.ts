export type DataSource = {
  title: string;
  type: string;
  description: string;
};

type RawSource = Omit<DataSource, 'description'>;

export type SourceSchema = { [key: string]: RawSource };

export type SearchInput = {
  search: string;
};
