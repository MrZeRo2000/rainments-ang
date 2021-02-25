import { Pipe, PipeTransform } from '@angular/core';
import {DateFormatter} from '../utils/date-formatter';

@Pipe({
  name: 'localeDate'
})
export class LocaleDatePipe implements PipeTransform {

  transform(value: Date): string {
    return value && DateFormatter.formatLocaleDate(value);
  }

}
