import { DateRangeGenerator } from './date-range-generator';

describe('DateRangeGenerator', () => {

  const currentDate = new Date();
  const minDate = new Date(currentDate.getFullYear() - 3, 0, 1);
  const maxDate = new Date(currentDate.getFullYear() + 1, 11, 31);

  const instance = new DateRangeGenerator(minDate, maxDate);

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });

  const months = instance.getMonths();
  const years = instance.getYears();

  it('first year', () => {
    expect(years[0]).toBe(minDate.getFullYear());
  });

  it('month name - march', () => {
    expect(months[2].id).toBe(2);
    expect(months[2].name).toBe('Mar');
  });

});
