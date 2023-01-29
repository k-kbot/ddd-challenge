import { TeamName } from './team-name';

describe('TeamName', () => {
  describe('build', () => {
    it('正常系 値が任意の数字1文字であれば、インスタンス生成が行えること', () => {
      expect(TeamName.build('1')).toBeInstanceOf(TeamName);
    });

    it('異常系 値が任意の数字1文字でなければ、インスタンス生成が行えないこと', () => {
      expect(() => TeamName.build('🙅')).toThrow(
        'チーム名は数字1文字のみが許可されています。',
      );
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(TeamName.rebuild('🙅')).toBeInstanceOf(TeamName);
    });
  });
});
