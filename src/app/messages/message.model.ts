
export enum MessageType {
  MT_INFO,
  MT_WARNING,
  MT_ERROR
}

export class Message {
  constructor(public messageType: MessageType, public messageText: string) {
  }
}

export class ErrorMessage extends Message {
  constructor(public messageText: string) {
    super(MessageType.MT_ERROR, messageText);
  }
}
