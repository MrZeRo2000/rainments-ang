export class DateRangeGenerator {
  constructor(private minDate: Date, private maxDate: Date) {
  }

  getYears(): Array<number> {
    const minYear = this.minDate.getFullYear();
    const maxYear = this.maxDate.getFullYear();
    return [...Array(maxYear - minYear + 1)].map((c, i, v) => minYear + i);
  }

  getMonths(): Array<MonthInfo> {
    const d0 = new Date();
    return [...Array(12)].map((c, i, v) =>
      new MonthInfo(i, (new Date(d0.setMonth(i))).toLocaleString('en-US', {month: 'short'})));
  }
}

export class MonthInfo {
  constructor(public id: number, public name: string) {
  }
}
