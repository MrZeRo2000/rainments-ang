import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(value: number, precision?: number): string {
    return ((value || value === 0) && value.toFixed(isNaN(precision) ? 2 : precision)) || null;
  }

}
