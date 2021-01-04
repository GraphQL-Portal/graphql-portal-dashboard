export default interface IAccessControlService {
  isOwner(userId: string, entityId: string): Promise<boolean>;
}
