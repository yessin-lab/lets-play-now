export class Game {
  constructor(public readonly name: string) {
    if (name.length > 50) {
        throw new Error()
    }
  }
}
