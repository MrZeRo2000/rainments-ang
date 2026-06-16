import { Pipe, PipeTransform } from '@angular/core';
import {DateFormatter} from '../utils/date-formatter';

@Pipe({
    name: 'shortMonthYear'
})
export class ShortMonthYearPipe implements PipeTransform {

  transform(value: Date | null | undefined): string {
    return value ? DateFormatter.formatDateShortMonthYear(value) : '';
  }
}
