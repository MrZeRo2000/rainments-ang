import { CrudRepository } from './crud-repository';

describe('CrudRepository', () => {
  it('should create an instance', () => {
    expect(new CrudRepository()).toBeTruthy();
  });
});
