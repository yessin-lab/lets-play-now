export class Slot {
  constructor(private readonly start: Date, private readonly end: Date) {
    if (end < start) {
      throw new EndShouldBeAfterStart();
    }
  }

  equals(other: Slot): boolean {
    return this.start === other.start && this.end === other.end;
  }
}

export class EndShouldBeAfterStart {}
