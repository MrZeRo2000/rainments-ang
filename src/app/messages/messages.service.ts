import { Injectable } from '@angular/core';
import {Message} from './message.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Array<Message> = new Array<Message>();
  private lastMessage: Subject<Message> = new Subject<Message>();

  constructor() { }

  reportMessage(message: Message): void {
    this.messages.push(message);
    this.lastMessage.next(message);
  }

  getLastMessage(): Observable<Message> {
    return this.lastMessage;
  }

  getMessages(): Message[] {
    return this.messages;
  }
}
