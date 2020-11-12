import {TimePeriod, TimePeriodType, TimePeriodUtils} from './time-period';

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
    expect(instance).toBeNull();
  });

  it('parsing from undefined string', () => {
    const instance = TimePeriod.fromString(undefined);
    expect(instance).toBeNull();
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
    expect(instance.toString()).toBeFalsy();
  })

});

describe('TimePeriodUtils', () => {
  it('truncate to period: month', () => {
    expect(TimePeriodUtils.truncateToPeriod(new Date(2020, 2, 20), TimePeriodType.M)).toEqual(new Date(2020, 2, 1));
  });

  it('truncate to period: quarter: march', () => {
    expect(TimePeriodUtils.truncateToPeriod(new Date(2020, 2, 20), TimePeriodType.Q)).toEqual(new Date(2020, 0, 1));
  });

  it('truncate to period: quarter: april', () => {
    expect(TimePeriodUtils.truncateToPeriod(new Date(2020, 3, 10), TimePeriodType.Q)).toEqual(new Date(2020, 3, 1));
  });

  it('truncate to period: quarter: december', () => {
    expect(TimePeriodUtils.truncateToPeriod(new Date(2020, 11, 7), TimePeriodType.Q)).toEqual(new Date(2020, 9, 1));
  });

  it('add period: date', () => {
    expect(TimePeriodUtils.addPeriod(new Date(2020, 0, 31), new TimePeriod(TimePeriodType.D))).toEqual(new Date(2020, 1, 1));

    expect(TimePeriodUtils.addPeriod(new Date(2020, 0, 31), new TimePeriod(TimePeriodType.D, 3))).toEqual(new Date(2020, 1, 3));
  });

  it('add period: month', () => {
    expect(TimePeriodUtils.addPeriod(new Date(2020, 0, 2), new TimePeriod(TimePeriodType.M))).toEqual(new Date(2020, 1, 2));
  });

  it('add period: quarter', () => {
    expect(TimePeriodUtils.addPeriod(new Date(2020, 11, 20), new TimePeriod(TimePeriodType.Q))).toEqual(new Date(2021, 2, 20));
  });

});
