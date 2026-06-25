import {inject, Injectable, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Message, MessageType} from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private snackBar = inject(MatSnackBar);

  private messages: Array<Message> = new Array<Message>();
  private readonly lastMessageSignal = signal<Message | undefined>(undefined);

  /** The most recently reported message (undefined when reset). */
  readonly lastMessage = this.lastMessageSignal.asReadonly();

  reportMessage(message: Message): void {
    this.messages.push(message);
    this.lastMessageSignal.set(message);

    // Show the message as a Material snackbar (like the reference project).
    // Done at report-time so it never depends on which panel is mounted.
    // resetMessage() passes undefined -> nothing to show.
    if (message) {
      this.snackBar.open(message.messageText, '', {
        duration: message.messageType === MessageType.MT_ERROR ? 7000 : 4000,
        panelClass: this.panelClass(message.messageType),
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  resetMessage(): void {
    this.reportMessage(undefined);
  }

  getMessages(): Message[] {
    return this.messages;
  }

  private panelClass(type: MessageType): string {
    switch (type) {
      case MessageType.MT_ERROR: return 'app-snackbar-error';
      case MessageType.MT_WARNING: return 'app-snackbar-warning';
      case MessageType.MT_SUCCESS: return 'app-snackbar-success';
      default: return 'app-snackbar-info';
    }
  }
}
