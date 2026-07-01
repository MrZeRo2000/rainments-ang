import {Component, inject, signal} from '@angular/core';
import {MessagesService} from '../../messages/messages.service';
import {NavListSelectorComponent} from "../../core/components/nav-list-selector/nav-list-selector.component";
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
    NavListSelectorComponent,
    PaymentObjectsTableComponent,
    PaymentGroupsTableComponent,
    ProductsTableComponent,
    DataManagementComponent
  ]
})
export class SettingsComponent {
  private messagesService: MessagesService = inject(MessagesService);

  public SettingItemEnumType = SettingItemEnum;
  settingItems = Object.values(SettingItemEnum);

  selectedItem = signal(SettingItemEnum.PAYMENT_OBJECTS);

  onItemSelected(item: string) {
    this.messagesService.resetMessage();
    this.selectedItem.set(item as SettingItemEnum);
  }
}
