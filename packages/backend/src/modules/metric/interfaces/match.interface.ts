export default interface IMatch {
  requestDate: {
    $gte?: Date;
    $lte?: Date;
  };
  'resolvers.sourceId'?: string;
  apiDef?: string;
  user?: string;
}
