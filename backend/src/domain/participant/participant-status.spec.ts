import { ParticipantStatus } from './participant-status';

describe('ParticipantStatus', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(ParticipantStatus.build('active')).toBeInstanceOf(
        ParticipantStatus,
      );
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(ParticipantStatus.rebuild('🙅🙅🙅🙅')).toBeInstanceOf(
        ParticipantStatus,
      );
    });
  });
});
