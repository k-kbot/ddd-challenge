import { TeamName } from './team-name';
import { DomainException } from '../shared/domain-exception';

describe('TeamName', () => {
  describe('build', () => {
    it('正常系 値が3文字以下の数字であれば、インスタンス生成が行えること', () => {
      expect(TeamName.build('123')).toBeInstanceOf(TeamName);
    });

    it('異常系 値が3文字を超えた場合、インスタンス生成が行えないこと', () => {
      try {
        TeamName.build('1234');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'チーム名は3文字以下の数字のみが許可されています。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });

    it('異常系 値に数字以外の文字が含まれている場合、インスタンス生成が行えないこと', () => {
      try {
        TeamName.build('1a!');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'チーム名は3文字以下の数字のみが許可されています。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(TeamName.rebuild('🙅🙅🙅🙅')).toBeInstanceOf(TeamName);
    });
  });
});
