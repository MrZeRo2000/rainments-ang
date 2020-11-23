import {DateFormatter} from './date-formatter';

export class DateRangeGenerator {
  private minDate;
  private maxDate;
  private period;

  constructor(minDate: Date, maxDate: Date, period: string = 'M') {
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.period = period || 'M';
  }

  getYears(): Array<number> {
    const minYear = this.minDate.getFullYear();
    const maxYear = this.maxDate.getFullYear();
    return [...Array(maxYear - minYear + 1)].map((c, i, v) => minYear + i);
  }

  getMonths(): Array<PeriodInfo> {
    return [...Array(12)].map((c, i, v) =>
      new PeriodInfo(i, DateFormatter.formatDateShortMonth(new Date(0, i))));
  }

  getQuarters(): Array<PeriodInfo> {
    return [...Array(4)].map((c, i, v) => {
      const monthStart = i * 3;
      const monthEnd = monthStart + 2;
      const monthStartFormatted = DateFormatter.formatDateShortMonth(new Date(0, monthStart))
      const monthEndFormatted = DateFormatter.formatDateShortMonth(new Date(0, monthEnd))
      return new PeriodInfo(i, `Q${i+1} (${monthStartFormatted} - ${monthEndFormatted})`);
    });
  }

  getPeriods(): Array<PeriodInfo> {
    if (this.period === 'M') {
      return this.getMonths();
    } else if (this.period === 'Q') {
      return this.getQuarters()
    } else {
      return null;
    }
  }

}

export class PeriodInfo {
  constructor(public id: number, public name: string) {
  }
}
