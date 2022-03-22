import {Component, Input, OnInit} from '@angular/core';
import {SelectableItem} from '../../model/selectable-item';

@Component({
  selector: 'app-core-selectable-panel',
  templateUrl: './core-selectable-panel.component.html',
  styleUrls: ['./core-selectable-panel.component.scss']
})
export class CoreSelectablePanelComponent <T> implements OnInit {

  @Input()
  public selectableItems: Array<SelectableItem<T>>;

  constructor() { }

  ngOnInit(): void {
  }

  onCheckAllClick(event): void {
    this.selectableItems?.forEach(p => p.isSelected = true);
  }

  onClearAllClick(event): void {
    this.selectableItems?.forEach(p => p.isSelected = false);
  }

  isAllSelected(): boolean {
    return SelectableItem.getSelectedCount(this.selectableItems) == this.selectableItems?.length;
  }

  isAnySelected(): boolean {
    return this.selectableItems?.length > 0 && SelectableItem.getSelectedCount(this.selectableItems) > 0;
  }
}
