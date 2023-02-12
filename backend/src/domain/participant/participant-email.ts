export class ParticipantEmail {
  // メールアドレスを表す現実的な正規表現
  // https://qiita.com/sakuro/items/1eaa307609ceaaf51123
  private static readonly REGEX =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  private constructor(private email: string) {}

  static build(email: string): ParticipantEmail {
    if (!this.REGEX.test(email)) {
      throw new Error(`不正なメールアドレスです。`);
    }

    return new ParticipantEmail(email);
  }

  static rebuild(email: string): ParticipantEmail {
    return new ParticipantEmail(email);
  }

  get value(): string {
    return this.email;
  }
}
