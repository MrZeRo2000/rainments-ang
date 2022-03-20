import { SelectableItem } from './selectable-item';

describe('SelectableItem', () => {
  it('should create an instance', () => {
    expect(new SelectableItem<string>('Value', true)).toBeTruthy();
  });
});
