import { TeamId } from './team-id';

describe('TeamId', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(TeamId.build()).toBeInstanceOf(TeamId);
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(TeamId.rebuild('id')).toBeInstanceOf(TeamId);
    });
  });
});
