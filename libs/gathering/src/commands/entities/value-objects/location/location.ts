export class Location {
  constructor(
    private readonly city: string,
    private readonly postalCode: string,
    private readonly address: string
  ) {}

  equals(other: Location): boolean {
    return (
      this.address === other.address &&
      this.city === other.city &&
      this.postalCode === other.postalCode
    );
  }

  getCity(): string {
    return this.city;
  }

  getAddress(): string {
    return this.address;
  }

  getPostalCode(): string {
    return this.postalCode;
  }
}
