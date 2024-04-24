import { EndShouldBeAfterStart, Slot } from './slot';

describe('slot', () => {
  test('valid slot', () => {
    const start = new Date('2023-09-06T18:00:00');
    const end = new Date('2023-09-06T19:00:00');

    expect(new Slot(start, end)).toBeDefined();
  });

  test('end should be after start', () => {
    const start = new Date('2022-12-17T03:00:00');
    const end = new Date('2022-12-17T02:00:00');

    expect(() => new Slot(start, end)).toThrow(EndShouldBeAfterStart);
  });

  test('end cannot be at the same time as start', () => {
    const start = new Date('2022-12-17T03:00:00');
    const end = new Date('2022-12-17T03:00:00');

    expect(() => new Slot(start, end)).toThrow(EndShouldBeAfterStart);
  });
});
