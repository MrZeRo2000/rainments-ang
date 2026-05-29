import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SelectableItem} from '../../model/selectable-item';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-drop-down-multi-select',
  templateUrl: './drop-down-multi-select.component.html',
  imports: [
    BsDropdownModule,
    NgClass
  ],
  styleUrls: ['./drop-down-multi-select.component.scss']
})
export class DropDownMultiSelectComponent {

  @Input()
  title: string;

  @Input()
  selectableItems: Array<SelectableItem<string>>;

  @Output()
  selectionChanged = new EventEmitter<Array<SelectableItem<string>>>();

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
