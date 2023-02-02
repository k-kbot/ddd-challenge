export class TeamName {
  private static readonly MAX_LENGTH = 3;
  private static readonly REGEX = /^\d+$/;

  private constructor(private name: string) {}

  static build(name: string): TeamName {
    if (name.length > this.MAX_LENGTH || !this.REGEX.test(name)) {
      throw new Error(
        `チーム名は${this.MAX_LENGTH}文字以下の数字のみが許可されています。`,
      );
    }

    return new TeamName(name);
  }

  static rebuild(name: string): TeamName {
    return new TeamName(name);
  }

  get value(): string {
    return this.name;
  }
}
