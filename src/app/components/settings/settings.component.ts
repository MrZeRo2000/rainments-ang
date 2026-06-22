import {Component, inject, signal} from '@angular/core';
import {MessagesService} from '../../messages/messages.service';
import {EnumStringValuePipe} from "../../core/pipes/enum-string-value.pipe";
import {MatListModule} from "@angular/material/list";
import {MessageComponent} from "../../messages/message.component";
import {PaymentObjectsTableComponent} from "../payment-objects-table/payment-objects-table.component";
import {PaymentGroupsTableComponent} from "../payment-groups-table/payment-groups-table.component";
import {ProductsTableComponent} from "../products-table/products-table.component";
import {DataManagementComponent} from "../data-managment/data-management.component";

export class SettingItem {
  constructor(public id: number, public name: string) {}
}

export enum SettingItemEnum {
  PAYMENT_OBJECTS = 'Payment Objects',
  PAYMENT_GROUPS = 'Payment Groups',
  PRODUCTS = 'Products',
  DATA_MANAGEMENT = 'Data management'
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    EnumStringValuePipe,
    MatListModule,
    MessageComponent,
    PaymentObjectsTableComponent,
    PaymentGroupsTableComponent,
    ProductsTableComponent,
    DataManagementComponent
  ]
})
export class SettingsComponent {
  private messagesService: MessagesService = inject(MessagesService);

  public SettingItemEnumType = SettingItemEnum;

  selectedItem = signal(SettingItemEnum.PAYMENT_OBJECTS);

  onItemClick(event, item) {
    event.preventDefault();
    this.messagesService.resetMessage();
    this.selectedItem.set(item);
  }
}
