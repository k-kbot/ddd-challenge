import { DomainException } from '../shared/domain-exception';

export class ParticipantName {
  private static readonly MAX_LENGTH = 20;

  private constructor(private name: string) {}

  static build(name: string): ParticipantName {
    if (name.length > this.MAX_LENGTH) {
      throw new DomainException(
        `参加者名は${this.MAX_LENGTH}文字以下が許可されています。`,
        400,
      );
    }

    return new ParticipantName(name);
  }

  static rebuild(name: string): ParticipantName {
    return new ParticipantName(name);
  }

  get value(): string {
    return this.name;
  }
}
