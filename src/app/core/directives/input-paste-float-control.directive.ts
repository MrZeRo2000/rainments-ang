import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl, NgModel} from '@angular/forms';
import {ClipboardNumberConverter} from '../utils/clipboard-number-converter';

@Directive({
  selector: '[appInputPasteFloatControl]'
})
export class InputPasteFloatControlDirective {

  constructor(private control: NgControl) { }

  @HostListener('paste', ['$event'])
  onPaste(event) {
    const parsedText = ClipboardNumberConverter.getConverted(event);
    if (!isNaN(parsedText)) {
      event.preventDefault();
      this.control?.control.setValue(parsedText);
    }
  }
}
