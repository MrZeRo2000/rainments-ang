import { Component, OnInit } from '@angular/core';
import {MessagesService} from './messages.service';
import {Message} from './message.model';
import {MessageType} from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
  displayMessage: Message;
  MessageType = MessageType;

  constructor(private messagesService: MessagesService) {
    messagesService.getLastMessage().subscribe((message) => {
      this.displayMessage = message;
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
    this.displayMessage = undefined;
  }
}
