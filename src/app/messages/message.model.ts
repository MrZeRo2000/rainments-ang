
export enum MessageType {
  MT_INFO,
  MT_SUCCESS,
  MT_WARNING,
  MT_ERROR
}

export class Message {
  constructor(public messageType: MessageType, public messageText: string) {
  }
}

export class InfoMessage extends Message {
  constructor(public messageText: string) {
    super(MessageType.MT_INFO, messageText);
  }
}

export class SuccessMessage extends Message {
  constructor(public messageText: string) {
    super(MessageType.MT_SUCCESS, messageText);
  }
}

export class ErrorMessage extends Message {
  constructor(public messageText: string) {
    super(MessageType.MT_ERROR, messageText);
  }
}

export class WarningMessage extends Message {
  constructor(public messageText: string) {
    super(MessageType.MT_WARNING, messageText);
  }
}
