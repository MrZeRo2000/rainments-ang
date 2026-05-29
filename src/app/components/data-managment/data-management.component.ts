import { Component } from '@angular/core';
import {MessageComponent} from "../../messages/message.component";
import {BackupDatabaseComponent} from "../backup-database/backup-database.component";
import {UpdatePaymentGroupComponent} from "../update-payment-group/update-payment-group.component";

@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  imports: [
    MessageComponent,
    BackupDatabaseComponent,
    UpdatePaymentGroupComponent
  ],
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent {

}
