import {Injectable, signal} from '@angular/core';
import {Message} from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Array<Message> = new Array<Message>();
  private readonly lastMessageSignal = signal<Message | undefined>(undefined);

  /** The most recently reported message (undefined when reset). */
  readonly lastMessage = this.lastMessageSignal.asReadonly();

  reportMessage(message: Message): void {
    this.messages.push(message);
    this.lastMessageSignal.set(message);
  }

  resetMessage(): void {
    this.reportMessage(undefined);
  }

  getMessages(): Message[] {
    return this.messages;
  }
}
