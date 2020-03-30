export class DateRangeGenerator {
  constructor(private minDate: Date, private maxDate: Date) {
  }

  getYears(): Array<number> {
    const minYear = this.minDate.getFullYear();
    const maxYear = this.maxDate.getFullYear();
    return [...Array(maxYear - minYear + 1)].map((c, i, v) => minYear + i);
  }

  getMonths(): Array<MonthInfo> {
    return [...Array(12)].map((c, i, v) =>
      new MonthInfo(i, (new Date(0, i)).toLocaleString('en-US', {month: 'short'})));
  }
}

export class MonthInfo {
  constructor(public id: number, public name: string) {
  }
}
