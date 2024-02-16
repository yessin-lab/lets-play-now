import { SessionId } from './session-id';

describe('sessionId', () => {
  test('sessionId value-object', () => {
    const firstSessionId = new SessionId(
      '08a64d24-24d0-41ab-a871-7b8a33560049'
    );
    const secondSessionId = new SessionId(
      '08a64d24-24d0-41ab-a871-7b8a33560049'
    );

    expect(firstSessionId.equals(secondSessionId)).toBe(true);
  });
});
