import { ParticipantName } from './participant-name';

describe('ParticipantName', () => {
  describe('build', () => {
    it('正常系 値が20文字以下であれば、インスタンス生成が行えること', () => {
      expect(ParticipantName.build('a'.repeat(20))).toBeInstanceOf(
        ParticipantName,
      );
    });

    it('異常系 値が20文字を超えた場合、インスタンス生成が行えないこと', () => {
      expect(() => ParticipantName.build('a'.repeat(21))).toThrow(
        '参加者名は20文字以下が許可されています。',
      );
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
