import { v4 as uuidv4 } from 'uuid';

export class TeamId {
  private constructor(private readonly id: string) {
    this.id = id;
  }

  static build(): TeamId {
    return new TeamId(uuidv4());
  }

  static rebuild(value: string): TeamId {
    return new TeamId(value);
  }

  get value(): string {
    return this.id;
  }
}
