import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {urlValidator} from '../validators/form-validators';

@Directive({
    selector: '[appUrlValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UrlValidatorDirective, multi: true }]
})
export class UrlValidatorDirective implements Validator {
  private valFn = urlValidator();

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
