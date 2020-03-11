import { FilterHeadersPipe } from './filter-headers.pipe';

describe('FilterHeadersPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterHeadersPipe();
    expect(pipe).toBeTruthy();
  });
});
