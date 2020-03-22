import { Component, OnInit } from '@angular/core';

export class SettingItem {
  constructor(public id: number, public name: string) {}
}

export enum SettingItemEnum {
  PAYMENT_OBJECTS = 'Payment Objects',
  PAYMENT_GROUPS = 'Payment Groups',
  PRODUCTS = 'Products',
  IMPORT_EXPORT = 'Import / Export'
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public SettingItemEnumType = SettingItemEnum;

  selectedItem: SettingItemEnum = SettingItemEnum.PAYMENT_OBJECTS;

  ngOnInit() {
  }

  onItemClick(event, item) {
    event.preventDefault();
    this.selectedItem = item;
  }

}
