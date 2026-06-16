import {Signal} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

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
