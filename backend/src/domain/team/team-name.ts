export class TeamName {
  private static readonly REGEX = /\d/;

  private constructor(private value: string) {}

  static build(value: string): TeamName {
    if (!this.REGEX.test(value)) {
      throw new Error('チーム名は数字1文字のみが許可されています。');
    }

    return new TeamName(value);
  }

  static rebuild(value: string): TeamName {
    return new TeamName(value);
  }
}
