import { EnumStringValuePipe } from './enum-string-value.pipe';

describe('EnumStringValuePipe', () => {
  it('create an instance', () => {
    const pipe = new EnumStringValuePipe();
    expect(pipe).toBeTruthy();
  });
});
