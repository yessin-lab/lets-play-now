export class Slot {
  constructor(private readonly start: Date, private readonly end: Date) {
    if (end <= start) {
      throw new EndShouldBeAfterStart();
    }
  }

  equals(other: Slot): boolean {
    return (
      this.start.getTime() === other.start.getTime() &&
      this.end.getTime() === other.end.getTime()
    );
  }

  getStart(): Date {
    return this.start;
  }

  getEnd(): Date {
    return this.end;
  }
}

export class EndShouldBeAfterStart extends Error {
  constructor() {
    super('End date should be after stard date');
  }
}
