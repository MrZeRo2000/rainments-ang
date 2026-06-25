import {Component, input} from '@angular/core';

@Component({
  selector: 'app-message',
  // Messages are now shown globally via MatSnackBar from MessagesService, so this
  // component renders nothing. Kept (with its messageSource input) so existing
  // <app-message> tags keep compiling; the tags can be removed in a later cleanup.
  template: ''
})
export class MessageComponent {
  messageSource = input<string>();
}
