
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

  constructor(readonly periodType: TimePeriodType, readonly quantity: number = 1) {
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
      case TimePeriodType.M:
        return new Date(date.getFullYear(), date.getMonth(), 1);
      case TimePeriodType.Q:
        return new Date(date.getFullYear(), Math.trunc(date.getMonth() / 3) * 3, 1);
      default:
        return null;
    }
  }

  public static addPeriod(date: Date, timePeriod: TimePeriod): Date {
    switch (timePeriod.periodType) {
      case TimePeriodType.D:
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + timePeriod.quantity);
      case TimePeriodType.M:
        return new Date(date.getFullYear(), date.getMonth() + timePeriod.quantity, date.getDate());
      case TimePeriodType.Q:
        return new Date(date.getFullYear(), date.getMonth() + 3 * timePeriod.quantity, date.getDate());
      default:
        return date;
    }
  }
}
