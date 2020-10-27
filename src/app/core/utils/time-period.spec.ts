import {TimePeriod, TimePeriodType} from './time-period';

describe('TimePeriod', () => {
  it('should create an instance', () => {
    expect(new TimePeriod(TimePeriodType.D, 1)).toBeTruthy();
  });

  it('parsing from string: 1 Q', () => {
    const instance = TimePeriod.fromString('1Q');
    expect(instance.periodType).toBe(TimePeriodType.Q)
    expect(instance.quantity).toBe(1)
  });

  it('parsing from wrong string', () => {
    const instance = TimePeriod.fromString('1X');
    expect(instance.periodType).toBeUndefined()
    expect(instance.quantity).toBeUndefined()
  });

  it('parsing from string without quantity', () => {
    const instance = TimePeriod.fromString('M');
    expect(instance.periodType).toBe(TimePeriodType.M)
    expect(instance.quantity).toBe(1)
  });

  it('instance to string', () => {
    const instance = new TimePeriod(TimePeriodType.D, 20);
    expect(instance.toString()).toBe('20D');
  })

});
