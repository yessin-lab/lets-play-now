import { Game } from './game';

describe('game', () => {
    it('should not create a valid game', () => {
    expect(new Game("Clank!").name).toBe("Clank!")
  });
  
  it('should not be longer than 50 letters', () => {
    expect(() => new Game("123456789012345678901234567890123456789012345678901")).toThrow()
  });
});
