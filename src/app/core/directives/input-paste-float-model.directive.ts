import {Directive, HostListener} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ClipboardNumberConverter} from '../utils/clipboard-number-converter';

@Directive({
    selector: '[appInputPasteFloatModel]',
    standalone: false
})
export class InputPasteFloatModelDirective {

  constructor(private model: NgModel) { }

  /**
   * Idea taken from https://gist.github.com/razorcd/0fb5bbac4758ba7da2c97da3fa1f4424
   * @param event with clipboard data
   */
  @HostListener('paste', ['$event'])
  onPaste(event) {
    const convertedValue = ClipboardNumberConverter.getConverted(event);
    if (!isNaN(convertedValue)) {
      event.preventDefault();
      this.model.viewToModelUpdate(convertedValue);
      this.model.valueAccessor.writeValue(convertedValue);
    }
  }
}
