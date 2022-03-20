import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {SelectableItem} from '../../model/selectable-item';

@Component({
  selector: 'app-drop-down-multi-select',
  templateUrl: './drop-down-multi-select.component.html',
  styleUrls: ['./drop-down-multi-select.component.scss']
})
export class DropDownMultiSelectComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  selectableItems: Array<SelectableItem<string>>;

  @Output()
  selectionChanged = new EventEmitter<Array<SelectableItem<string>>>();

  constructor() { }

  ngOnInit(): void {
  }

  public dropDownClick(event: any, item: SelectableItem<string>) {
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
