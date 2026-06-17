import {signal} from '@angular/core';

/**
 * Signal-based helper for inline (in-cell) editing. The active selection is held
 * as signals so template bindings (isEditorVisible, the bound value, validators)
 * update without relying on Zone change detection.
 */
export class InlineEditHandler<T> {
  readonly selectedItem = signal<T | undefined>(undefined);
  readonly controlName = signal<string | undefined>(undefined);
  readonly value = signal<string>('');
  readonly active = signal(false);

  inputValidator: (item: T, controlName: string, value: string) => boolean;
  inputProcessor: (item: T, controlName: string, value: string) => void;

  start(item: T, controlName: string, initialValue: string): void {
    this.selectedItem.set(item);
    this.controlName.set(controlName);
    this.value.set(initialValue);
    this.active.set(true);
  }

  refOnClick(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  controlOnClick(event: any): void {
    event.stopPropagation();
  }

  focusOut(): void {
    this.active.set(false);
  }

  keyUp(event: any, item: T): void {
    if (event.key === 'Escape') {
      this.active.set(false);
    } else if (event.key === 'Enter') {
      if (!this.inputValidator || this.inputValidator(item, this.controlName(), this.value())) {
        this.inputProcessor?.(item, this.controlName(), this.value());
        this.active.set(false);
      }
    }
  }

  isEditorVisible(item: T, controlName: string): boolean {
    return this.active() && this.controlName() === controlName && this.selectedItem() === item;
  }
}
