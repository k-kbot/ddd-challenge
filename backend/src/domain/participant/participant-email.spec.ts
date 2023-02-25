import { ParticipantEmail } from './participant-email';
import { DomainException } from '../shared/domain-exception';

describe('ParticipantEmail', () => {
  describe('build', () => {
    it('正常系 正当なメールアドレスの場合、インスタンス生成が行えること', () => {
      expect(ParticipantEmail.build('test@example.com')).toBeInstanceOf(
        ParticipantEmail,
      );
    });

    it('異常系 不正なメールアドレスの場合、インスタンス生成が行えないこと', () => {
      try {
        ParticipantEmail.build('@foo');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          '不正なメールアドレスです。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
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
