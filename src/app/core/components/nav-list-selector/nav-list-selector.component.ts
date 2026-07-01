import {Component, input, output} from '@angular/core';
import {MatListModule} from '@angular/material/list';

/**
 * A vertical list of selectable "pill" buttons (like the material.angular.dev
 * docs nav). Presentational: takes the item labels and the selected one, and
 * emits when a different item is clicked.
 */
@Component({
  selector: 'app-core-nav-list-selector',
  templateUrl: './nav-list-selector.component.html',
  imports: [MatListModule],
  styleUrls: ['./nav-list-selector.component.scss']
})
export class NavListSelectorComponent {
  items = input.required<string[]>();
  selected = input<string>();

  selectedChange = output<string>();

  onItemClick(event: Event, item: string): void {
    event.preventDefault();
    this.selectedChange.emit(item);
  }
}
