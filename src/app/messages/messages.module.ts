import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessagesService} from './messages.service';
import {AlertModule} from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot()
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
