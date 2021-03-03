import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

export class SelectableItem {
  constructor(public value: string, public isSelected: boolean) {
  }

  public static getSelectedItemValues(items: Array<SelectableItem>): Array<string> {
    return items.filter(value => value.isSelected).map(value => value.value);
  }
}

@Component({
  selector: 'app-drop-down-multi-select',
  templateUrl: './drop-down-multi-select.component.html',
  styleUrls: ['./drop-down-multi-select.component.scss']
})
export class DropDownMultiSelectComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  selectableItems: Array<SelectableItem>;

  @Output()
  selectionChanged = new EventEmitter<Array<SelectableItem>>();

  constructor() { }

  ngOnInit(): void {
  }

  public dropDownClick(event: any, item: SelectableItem) {
    event.preventDefault();
    if (event.ctrlKey) {
      this.selectableItems.forEach(v => v.isSelected = v.value === item.value);
      this.selectionChanged.emit(this.selectableItems);
    } else if (!item.isSelected || (this.selectableItems.filter(v => v.isSelected)).length > 1) {
      item.isSelected = !item.isSelected;
      this.selectionChanged.emit(this.selectableItems);
    }
  }

}
