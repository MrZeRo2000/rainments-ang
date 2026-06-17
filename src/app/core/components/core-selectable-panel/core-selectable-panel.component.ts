import {Component, input, output} from '@angular/core';
import {SelectableItem} from '../../model/selectable-item';

@Component({
    selector: 'app-core-selectable-panel',
    templateUrl: './core-selectable-panel.component.html',
    styleUrls: ['./core-selectable-panel.component.scss']
})
export class CoreSelectablePanelComponent <T> {

  selectableItems = input<Array<SelectableItem<T>>>();

  // Emitted after select-all / clear-all so consumers can react (e.g. re-set a signal).
  selectionChanged = output<Array<SelectableItem<T>>>();

  onCheckAllClick(event): void {
    this.selectableItems()?.forEach(p => p.isSelected = true);
    this.selectionChanged.emit(this.selectableItems());
  }

  onClearAllClick(event): void {
    this.selectableItems()?.forEach(p => p.isSelected = false);
    this.selectionChanged.emit(this.selectableItems());
  }

  isAllSelected(): boolean {
    return SelectableItem.getSelectedCount(this.selectableItems()) == this.selectableItems()?.length;
  }

  isAnySelected(): boolean {
    return this.selectableItems()?.length > 0 && SelectableItem.getSelectedCount(this.selectableItems()) > 0;
  }
}
