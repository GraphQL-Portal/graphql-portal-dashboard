export default interface IAggregateFilters {
  startDate: number | Date;
  endDate: number | Date;
  sourceId?: string;
  apiDef?: string;
  user?: string;
}
