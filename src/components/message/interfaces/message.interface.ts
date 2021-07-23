export interface IMessage {
  readonly ownerId: string;
  readonly roomId: string;
  readonly text: string;
}
