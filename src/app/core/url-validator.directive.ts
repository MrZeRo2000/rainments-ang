import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidatorFn, Validators, Validator} from '@angular/forms';

export function urlValidator(): ValidatorFn {
  const urlPattern = new RegExp('^((http|https)?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return (control: AbstractControl): {[key: string]: any} => {
    const url = control.value;
    const passed = !!urlPattern.test(url) && !(url === null) && !(url === undefined);
    return passed ? {invalidUrl: {url}} : null;
  };
}

@Directive({
  selector: '[appUrlValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi: true}]
})
export class UrlValidatorDirective implements Validator {
  private valFn = urlValidator();

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
