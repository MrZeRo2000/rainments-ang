import {Signal} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validates that the control's value is not already used as a `name` by another
 * entity in `dataSignal`. The edited entity is excluded by comparing against the
 * `id` of the control's parent form group, so editing a row without changing its
 * name does not flag it as a duplicate.
 *
 * Attach to the `name` control of a form group that also contains an `id` control.
 * Reports `{existingName: true}` on conflict.
 */
export function duplicateNamesValidator<T extends { id?: number; name?: string }>(
  dataSignal: Signal<T[]>
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent;
    if (!form) {
      return null;
    }

    const formId = parseInt(form.value.id, 10);
    const nameDuplicates = dataSignal().filter(
      (v) => (v.name === control.value) && (!formId || v.id !== formId)
    );

    return nameDuplicates.length > 0 ? {existingName: true} : null;
  };
}

/**
 * Validates that the control's value is a well-formed URL. Empty values pass.
 * Reports `{invalidUrl: {url}}` on a malformed URL.
 */
export function urlValidator(): ValidatorFn {
  const urlPattern = new RegExp('^((http|https)?:\\/\\/)' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;
    const passed = !!urlPattern.test(url);
    return url && !passed ? {invalidUrl: {url}} : null;
  };
}

/**
 * Validates that the control's value differs from a sibling control's value.
 * Empty values pass. Reports `{[errorKey]: true}` when the two are equal, and
 * composes with other control validators such as `Validators.required`.
 */
export function distinctFromSiblingValidator(siblingName: string, errorKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sibling = control.parent?.get(siblingName);
    if (!sibling) {
      return null;
    }

    const value = control.value ?? '';
    const other = sibling.value ?? '';
    return value !== '' && other !== '' && value === other ? {[errorKey]: true} : null;
  };
}

/**
 * Cross-field validator for the payment-object form: a payment term / pay-delay
 * only makes sense when a payment period is set. Sets per-control errors on
 * `termType`, `termQuantity` and `payDelay` rather than a group-level error.
 *
 * Attach as a group-level validator of a form group containing `period`,
 * `termType`, `termQuantity` and `payDelay` controls.
 */
export function termValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const controls = (form as FormGroup).controls;
    if (controls) {
      // reset() leaves controls at null, so treat null/undefined like empty.
      const period = controls['period'].value ?? '';
      const termType = controls['termType'].value ?? '';
      const termQuantity = controls['termQuantity'].value ?? '';
      const payDelay = controls['payDelay'].value ?? '';

      if (period === '') {
        if (termType !== '') {
          controls['termType'].setErrors({termNoPeriod: true});
        } else {
          controls['termType'].setErrors(null);
        }

        if (termQuantity !== '') {
          controls['termQuantity'].setErrors({termQuantityNoPeriod: true});
        } else {
          controls['termQuantity'].setErrors(null);
        }

        if (payDelay !== '') {
          controls['payDelay'].setErrors({delayNoPeriod: true});
        } else {
          controls['payDelay'].setErrors(null);
        }

      } else {
        if (termQuantity !== '' && termType === '') {
          controls['termQuantity'].setErrors({termQuantityNoType: true});
        } else {
          controls['termQuantity'].setErrors(null);
        }
      }
    }

    return null; // valid
  };
}

/**
 * Cross-field validator for the product form: a counter precision is only allowed
 * when a unit name is set. Sets the error on the `counterPrecision` control.
 *
 * Attach as a group-level validator of a form group containing `unitName` and
 * `counterPrecision` controls.
 */
export function precisionValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const controls = (form as FormGroup).controls;
    if (controls) {
      // reset() leaves controls at null, so treat null/undefined like empty.
      const unitName = (controls['unitName'].value ?? '').trim();
      const counterPrecision = controls['counterPrecision'].value ?? '';
      if (unitName === '' && counterPrecision !== '') {
        controls['counterPrecision'].setErrors({precisionForEmptyUnitName: true});
      } else {
        controls['counterPrecision'].setErrors(null);
      }
    }

    return null; // valid
  };
}
