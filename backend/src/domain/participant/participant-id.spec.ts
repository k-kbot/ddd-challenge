import { ParticipantId } from './participant-id';

describe('ParticipantId', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(ParticipantId.build()).toBeInstanceOf(ParticipantId);
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(ParticipantId.rebuild('id')).toBeInstanceOf(ParticipantId);
    });
  });
});
