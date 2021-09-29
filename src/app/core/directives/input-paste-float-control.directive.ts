import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appInputPasteFloatControl]'
})
export class InputPasteFloatControlDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('paste', ['$event'])
  onPaste(event) {
    const clipboardText = event.clipboardData?.getData('text');
    if (!!clipboardText) {
      const convertedText = clipboardText.replace(',', '.');
      const parsedText = parseFloat(convertedText);
      if (!isNaN(parsedText)) {
        event.preventDefault();
        // this.el.nativeElement.value = parsedText;
        this.control.control.setValue(parsedText);
      }
    }
  }
}
