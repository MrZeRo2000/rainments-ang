import {Directive, HostListener, inject} from '@angular/core';
import {NgControl} from '@angular/forms';
import {ClipboardNumberConverter} from '../utils/clipboard-number-converter';

@Directive({
    selector: '[appInputPasteFloatControl]'
})
export class InputPasteFloatControlDirective {
  private control = inject(NgControl)

  @HostListener('paste', ['$event'])
  onPaste(event) {
    const parsedValue = ClipboardNumberConverter.getConverted(event);
    if (!isNaN(parsedValue)) {
      event.preventDefault();
      this.control?.control.setValue(parsedValue);
    }
  }
}
