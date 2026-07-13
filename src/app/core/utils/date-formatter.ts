import {formatDate} from "@angular/common";

export class DateFormatter {
  static formatDateShortMonthYear(date: Date) {
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short'});
  }

  static formatDateShortMonth(date: Date) {
    return date.toLocaleDateString('en-US', {month: 'short'});
  }

  static formatLocaleDate(date: Date) {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }

  static formatLocaleDateTime(date: Date) {
    return formatDate(date, 'dd.MM.yyyy HH:mm:ss', 'en');
  }

}
