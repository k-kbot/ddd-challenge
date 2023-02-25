import { ParticipantName } from './participant-name';
import { DomainException } from '../shared/domain-exception';

describe('ParticipantName', () => {
  describe('build', () => {
    it('正常系 値が20文字以下であれば、インスタンス生成が行えること', () => {
      expect(ParticipantName.build('a'.repeat(20))).toBeInstanceOf(
        ParticipantName,
      );
    });

    it('異常系 値が20文字を超えた場合、インスタンス生成が行えないこと', () => {
      try {
        ParticipantName.build('a'.repeat(21));
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          '参加者名は20文字以下が許可されています。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(ParticipantName.rebuild('🙅🙅🙅🙅')).toBeInstanceOf(
        ParticipantName,
      );
    });
  });
});
