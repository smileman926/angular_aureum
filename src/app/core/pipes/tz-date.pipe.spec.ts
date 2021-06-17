import { TzDatePipe } from './tz-date.pipe';

describe('TzDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TzDatePipe();
    expect(pipe).toBeTruthy();
  });
});
