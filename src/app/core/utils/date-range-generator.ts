import {DateFormatter} from './date-formatter';

export class DateRangeGenerator {
  private readonly minDate;
  private readonly maxDate;
  private readonly period;
  private readonly periodHandler: IPeriodHandler;

  constructor(minDate: Date, maxDate: Date, period: string = 'M') {
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.period = period || 'M';

    if (this.period === 'M') {
      this.periodHandler = new PeriodMonthHandler();
    } else if (this.period === 'Q') {
      this.periodHandler = new PeriodQuarterHandler();
    }
  }

  getYears(): Array<number> {
    const minYear = this.minDate.getFullYear();
    const maxYear = this.maxDate.getFullYear();
    return [...Array(maxYear - minYear + 1)].map((c, i, v) => minYear + i);
  }

  getPeriods(): Array<PeriodInfo> {
    return (this.periodHandler && this.periodHandler.getPeriods()) || null;
  }

  getPeriodValue(date: Date): number {
    return (this.periodHandler && this.periodHandler.getPeriodValue(date)) || null;
  }

  getPeriodDate(year: number, periodValue: number): Date {
    return (this.periodHandler && this.periodHandler.getPeriodDate(year, periodValue)) || null;
  }

  addPeriod(date: Date, value: number): Date {
    return (this.periodHandler && this.periodHandler.addPeriod(date, value)) || null;
  }
}

interface IPeriodHandler {
  getPeriods(): Array<PeriodInfo>;
  getPeriodValue(date: Date): number;
  getPeriodDate(year: number, periodValue: number): Date;
  addPeriod(date: Date, value: number): Date;
}

class PeriodMonthHandler implements IPeriodHandler {
  addPeriod(date: Date, value: number): Date {
    return new Date((new Date(date)).setMonth(date.getMonth() + value));
  }

  getPeriodDate(year: number, periodValue: number): Date {
    return new Date(year, periodValue, 1);
  }

  getPeriodValue(date: Date): number {
    return date.getMonth();
  }

  getPeriods(): Array<PeriodInfo> {
    return [...Array(12)].map((c, i, v) =>
      new PeriodInfo(i, DateFormatter.formatDateShortMonth(new Date(0, i))));
  }
}

class PeriodQuarterHandler implements IPeriodHandler {
  addPeriod(date: Date, value: number): Date {
    return new Date((new Date(date)).setMonth(date.getMonth() + value * 3));
  }

  getPeriodDate(year: number, periodValue: number): Date {
    return new Date(year, periodValue * 3, 1);
  }

  getPeriodValue(date: Date): number {
    return Math.trunc(date.getMonth() / 3);
  }

  getPeriods(): Array<PeriodInfo> {
    return [...Array(4)].map((c, i, v) => {
      const monthStart = i * 3;
      const monthEnd = monthStart + 2;
      const monthStartFormatted = DateFormatter.formatDateShortMonth(new Date(0, monthStart))
      const monthEndFormatted = DateFormatter.formatDateShortMonth(new Date(0, monthEnd))
      return new PeriodInfo(i, `Q${i+1} (${monthStartFormatted} - ${monthEndFormatted})`);
    });
  }
}

export class PeriodInfo {
  constructor(public id: number, public name: string) {
  }
}
