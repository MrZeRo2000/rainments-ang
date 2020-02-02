import { Component, OnInit } from '@angular/core';

export class SettingItem {
  constructor(public id: number, public name: string) {}
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  selectedItem: SettingItem;
  settingItems: Array<SettingItem> = new Array<SettingItem>();

  constructor() {
    this.settingItems.push(new SettingItem(100, 'Payment Objects'));
    this.settingItems.push(new SettingItem(200, 'Payment Groups'));
    this.settingItems.push(new SettingItem(300, 'Products'));

    this.selectedItem = this.settingItems[0];
  }

  ngOnInit() {
  }

  onItemClick(event, item) {
    event.preventDefault();
    this.selectedItem = item;
  }

}
