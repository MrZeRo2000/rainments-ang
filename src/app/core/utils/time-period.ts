
export enum TimePeriodType {
  D = 'D',
  M = 'M',
  Q = 'Q'
}

export class TimePeriod {
  public static fromString(text: string): TimePeriod {
    if (text) {
      const parsedString = text.match(/(\d+)?(\w)/);

      const periodType = TimePeriodType[parsedString[2]];

      let quantity: number;
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
