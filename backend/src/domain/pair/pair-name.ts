import { DomainException } from '../shared/domain-exception';

export class PairName {
  private static readonly MAX_LENGTH = 1;
  private static readonly REGEX = /^\d+$/;

  private constructor(private name: string) {}

  static build(name: string): PairName {
    if (name.length > this.MAX_LENGTH || !this.REGEX.test(name)) {
      throw new DomainException(
        `ペア名は${this.MAX_LENGTH}文字の数字のみが許可されています。`,
        400,
      );
    }

    return new PairName(name);
  }

  static rebuild(name: string): PairName {
    return new PairName(name);
  }

  get value(): string {
    return this.name;
  }
}
