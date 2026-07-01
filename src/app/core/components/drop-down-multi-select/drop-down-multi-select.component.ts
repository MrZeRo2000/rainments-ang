import {Component, input, output} from '@angular/core';
import {SelectableItem} from '../../model/selectable-item';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-drop-down-multi-select',
  templateUrl: './drop-down-multi-select.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  styleUrls: ['./drop-down-multi-select.component.scss']
})
export class DropDownMultiSelectComponent {

  title = input<string>();

  selectableItems = input<Array<SelectableItem<string>>>();

  selectionChanged = output<Array<SelectableItem<string>>>();

  public dropDownClick(event: any, item: SelectableItem<string>) {
    event.preventDefault();
    const items = this.selectableItems() ?? [];
    if (event.ctrlKey) {
      items.forEach(v => v.isSelected = v.value === item.value);
      // Emit a new array so the consumer's signal (set-with-Object.is) actually
      // changes and its filter recomputes — the items are mutated in place.
      this.selectionChanged.emit([...items]);
    } else if (!item.isSelected || items.filter(v => v.isSelected).length > 1) {
      item.isSelected = !item.isSelected;
      this.selectionChanged.emit([...items]);
    }
  }

}
