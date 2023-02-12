import { v4 as uuidv4 } from 'uuid';

export class ParticipantId {
  private constructor(private readonly id: string) {
    this.id = id;
  }

  static build(): ParticipantId {
    return new ParticipantId(uuidv4());
  }

  static rebuild(value: string): ParticipantId {
    return new ParticipantId(value);
  }

  get value(): string {
    return this.id;
  }
}
