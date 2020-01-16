import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  items: Map<number, string> = new Map([
    [100, 'Payment Objects'],
    [200, 'Payment Groups'],
    [300, 'Products']
  ]);

  selectedItem: number;

  constructor() {
    this.selectedItem = this.items.keys().next().value;
  }

  ngOnInit() {
  }

  onItemClick(event, key) {
    event.preventDefault();
    this.selectedItem = key;
  }

}
