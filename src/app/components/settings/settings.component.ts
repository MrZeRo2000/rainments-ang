import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../messages/messages.service';

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
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public SettingItemEnumType = SettingItemEnum;

  selectedItem: SettingItemEnum = SettingItemEnum.PAYMENT_OBJECTS;

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit() {
  }

  onItemClick(event, item) {
    event.preventDefault();
    this.messagesService.resetMessage();
    this.selectedItem = item;
  }

}
