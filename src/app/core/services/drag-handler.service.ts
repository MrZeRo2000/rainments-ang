import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragHandlerService {
  dragging = false;

  constructor() { }

  getDragClass(): string {
    if (this.dragging) {
      return 'cursor-grip';
    }
  }

  startDrag(): void {
    this.dragging = true;
  }

  stopDrag(): void {
    this.dragging = false;
  }
}
