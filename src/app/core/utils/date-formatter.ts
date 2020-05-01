export class DateFormatter {
  static formatDateShortMonthYear(date: Date) {
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short'});
  }

  static formatDateShortMonth(date: Date) {
    return date.toLocaleDateString('en-US', {month: 'short'});
  }

}
