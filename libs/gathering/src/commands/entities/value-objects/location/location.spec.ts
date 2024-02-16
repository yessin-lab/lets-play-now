import { Location } from './location';

describe('location', () => {
  test('location value-object', () => {
    const location = new Location('Vincenneuh', '94300', '17 rue des patates');
    expect(location).toBeDefined();
  });
});
