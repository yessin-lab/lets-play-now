export class SessionId {
  constructor(private readonly sessionId: string) {}

  equals(other: SessionId): boolean {
    return this.sessionId === other.sessionId;
  }

  asString(): string {
    return this.sessionId;
  }
}
