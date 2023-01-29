import { v4 as uuidv4 } from 'uuid';

export class TeamId {
  private constructor(private value: string) {
    this.value = value;
  }

  static build(): TeamId {
    return new TeamId(uuidv4());
  }

  static rebuild(value: string): TeamId {
    return new TeamId(value);
  }
}
