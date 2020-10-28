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
    expect(instance.periodType).toBeNull();
    expect(instance.quantity).toBeNull()
  });

  it('parsing from string without quantity', () => {
    const instance = TimePeriod.fromString('M');
    expect(instance.periodType).toBe(TimePeriodType.M)
    expect(instance.quantity).toBe(1)
  });

  it('parsing from null string', () => {
    const instance = TimePeriod.fromString(null);
    expect(instance).toBeNull()
  });

  it('parsing from undefined string', () => {
    const instance = TimePeriod.fromString(undefined);
    expect(instance).toBeNull()
  });

  it('instance to string', () => {
    const instance = new TimePeriod(TimePeriodType.D, 20);
    expect(instance.toString()).toBe('20D');
  })

  it('instance to string with no quantity', () => {
    const instance = new TimePeriod(TimePeriodType.D, null);
    expect(instance.toString()).toBe('1D');
  })

  it('instance to string with no period', () => {
    const instance = new TimePeriod(undefined, 1);
    expect(instance.toString()).toBeNull();
  })

});
