import { v4 as uuidv4 } from 'uuid';

export class PairId {
  private constructor(private readonly id: string) {
    this.id = id;
  }

  static build(): PairId {
    return new PairId(uuidv4());
  }

  static rebuild(value: string): PairId {
    return new PairId(value);
  }

  get value(): string {
    return this.id;
  }
}
