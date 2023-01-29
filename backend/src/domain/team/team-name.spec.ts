import { TeamName } from './team-name';

describe('TeamName', () => {
  describe('build', () => {
    it('正常系 値が3文字以下の数字であれば、インスタンス生成が行えること', () => {
      expect(TeamName.build('1')).toBeInstanceOf(TeamName);
    });

    it('異常系 値が3文字を超えた場合、インスタンス生成が行えないこと', () => {
      expect(() => TeamName.build('1234')).toThrow(
        'チーム名は3文字以下の数字のみが許可されています。',
      );
    });

    it('異常系 値が数字でない場合、インスタンス生成が行えないこと', () => {
      expect(() => TeamName.build('🙅')).toThrow(
        'チーム名は3文字以下の数字のみが許可されています。',
      );
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(TeamName.rebuild('🙅')).toBeInstanceOf(TeamName);
    });
  });
});
