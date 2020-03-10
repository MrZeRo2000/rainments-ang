import { PatchRequest } from './patch-request';

describe('PatchRequest', () => {
  it('should create an instance', () => {
    expect(new PatchRequest('replace', '/path')).toBeTruthy();
  });
});
