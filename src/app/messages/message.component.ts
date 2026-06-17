import {Component, effect, inject, input, signal} from '@angular/core';
import {MessagesService} from './messages.service';
import {Message} from './message.model';
import {MessageType} from './message.model';
import {AlertComponent} from "ngx-bootstrap/alert";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  imports: [
    AlertComponent
  ],
  styleUrls: ['./message.component.scss']
})

export class MessageComponent {
  private messagesService = inject(MessagesService)

  MessageType = MessageType;

  messageSource = input<string>();

  displayMessage = signal<Message | undefined>(undefined);

  constructor() {
    // Reflect the latest reported message that matches this panel's source.
    effect(() => {
      const message = this.messagesService.lastMessage();
      const source = this.messageSource();
      const matches =
        (!!source && !!message && message.messageSource === source) ||
        (!source && !!message && !message.messageSource);
      this.displayMessage.set(matches ? message : undefined);
    });
  }

  onClosed(): void {
    this.displayMessage.set(undefined);
  }
}
