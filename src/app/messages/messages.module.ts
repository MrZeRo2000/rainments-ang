import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessagesService} from './messages.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MessagesService
  ],
  declarations: [
    MessageComponent
  ],
  exports: [
    MessageComponent
  ]
})
export class MessagesModule { }
