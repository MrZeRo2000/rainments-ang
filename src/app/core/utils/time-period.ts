
export enum TimePeriodType {
  D = 'D',
  M = 'M',
  Q = 'Q'
}

export class TimePeriod {
  public static fromString(text: string): TimePeriod {
    if (text) {
      const parsedString = text.match(/(\d+)?(\w)/);

      const periodType = TimePeriodType[parsedString[2]] || null;

      let quantity: number = null;
      if (periodType) {
        quantity = Number.parseInt(parsedString[1], 10) || 1;
      }

      return new TimePeriod(periodType, quantity);
    } else {
      return null;
    }
  }

  constructor(readonly periodType: TimePeriodType, readonly quantity: number) {
    this.periodType = periodType;
    this.quantity = quantity;
  }

  public toString(): string {
    let result = this.quantity? this.quantity.toString(10): '1';

    if (this.periodType) {
      result = result + this.periodType.toString();
    }

    return result.length > 0 && this.periodType && result;
  }
}

export class TimePeriodUtils {
  public static truncateToPeriod(date: Date, periodType: TimePeriodType): Date {
    switch (periodType) {
      case TimePeriodType.D:
        return new Date(date.getFullYear(), date.getMonth(), 1);
      case TimePeriodType.Q:
        return new Date(date.getFullYear(), Math.trunc(date.getMonth() / 3) * 3, 1);
      default:
        return date;
    }
  }

  public static addPeriod(date: Date, periodType: TimePeriodType, periods: number = 1): Date {
    switch (periodType) {
      case TimePeriodType.D:
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + periods);
      case TimePeriodType.M:
        return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
      case TimePeriodType.Q:
        return new Date(date.getFullYear(), date.getMonth() + 3, date.getDate());
      default:
        return date;
    }
  }
}
