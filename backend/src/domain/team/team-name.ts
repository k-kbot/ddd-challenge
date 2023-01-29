export class TeamName {
  private static readonly MAX_LENGTH = 3;
  private static readonly REGEX = /\d/;

  private constructor(private value: string) {}

  static build(value: string): TeamName {
    if (value.length > this.MAX_LENGTH || !this.REGEX.test(value)) {
      throw new Error(
        `チーム名は${this.MAX_LENGTH}文字以下の数字のみが許可されています。`,
      );
    }

    return new TeamName(value);
  }

  static rebuild(value: string): TeamName {
    return new TeamName(value);
  }
}
