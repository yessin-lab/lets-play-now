export class Slot {
    constructor(private readonly start: Date, private readonly end: Date) {
        if (end < start) {
            throw new EndShouldBeAfterStart();
        }
    }
}

export class EndShouldBeAfterStart {}
