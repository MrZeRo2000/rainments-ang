export class DateGenerator {
  static getCurrentMonthStartDate(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }

  static getPreviousMonthStartDate(): Date {
    const currentMonthStartDate = DateGenerator.getCurrentMonthStartDate();
    return new Date(currentMonthStartDate.setMonth(currentMonthStartDate.getMonth() - 1));
  }

  static getConvertedPeriodDate(date: Date): Date {
    const result = new Date(date);

    result.setMinutes(
      result.getMinutes() - result.getTimezoneOffset()
    );

    return new Date(result);
  }
}
