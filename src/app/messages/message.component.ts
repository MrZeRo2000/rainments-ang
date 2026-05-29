import {Component, inject, Input} from '@angular/core';
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

  displayMessage: Message = null;
  MessageType = MessageType;

  @Input() messageSource: string;

  constructor() {
    this.messagesService.getLastMessage().subscribe((message) => {
      if (
        (this.messageSource && message && message.messageSource && this.messageSource === message.messageSource) ||
        (!this.messageSource && message && !message.messageSource)
      ) {
        this.displayMessage = message;
      } else {
        this.displayMessage = null;
      }
      /*
      setTimeout(() => {
        this.displayMessage = undefined;
      }, 5000);
       */
    });
  }

  onClosed(): void {
    this.clearMessage();
  }

  clearMessage(): void {
    this.displayMessage = undefined;
  }
}
