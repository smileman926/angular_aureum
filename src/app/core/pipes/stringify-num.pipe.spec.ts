import { StringifyNumPipe } from './stringify-num.pipe';

describe('StringifyNumPipe', () => {
  it('create an instance', () => {
    const pipe = new StringifyNumPipe();
    expect(pipe).toBeTruthy();
  });
});
