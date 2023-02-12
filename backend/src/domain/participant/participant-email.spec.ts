import { ParticipantEmail } from './participant-email';

describe('ParticipantEmail', () => {
  describe('build', () => {
    it('正常系 正当なメールアドレスの場合、インスタンス生成が行えること', () => {
      expect(ParticipantEmail.build('test@example.com')).toBeInstanceOf(
        ParticipantEmail,
      );
    });

    it('異常系 不正なメールアドレスの場合、インスタンス生成が行えないこと', () => {
      expect(() => ParticipantEmail.build('@foo')).toThrow(
        '不正なメールアドレスです。',
      );
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(ParticipantEmail.rebuild('🙅🙅🙅🙅')).toBeInstanceOf(
        ParticipantEmail,
      );
    });
  });
});
