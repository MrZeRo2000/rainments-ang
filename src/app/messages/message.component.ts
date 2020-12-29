import {Component, Input, OnInit} from '@angular/core';
import {MessagesService} from './messages.service';
import {Message} from './message.model';
import {MessageType} from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {
  displayMessage: Message = null;
  MessageType = MessageType;

  @Input() messageSource: string;

  constructor(private messagesService: MessagesService) {
    messagesService.getLastMessage().subscribe((message) => {
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

  ngOnInit() {
  }

  onClosed(): void {
    this.clearMessage();
  }

  clearMessage(): void {
    this.displayMessage = undefined;
  }
}
