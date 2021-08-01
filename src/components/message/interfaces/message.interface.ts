export default interface IMessage {
  readonly _id?: string;
  readonly ownerId: string;
  readonly roomId: string;
  readonly text: string;
}
