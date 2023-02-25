import { PairName } from './pair-name';
import { DomainException } from '../shared/domain-exception';

describe('PairName', () => {
  describe('build', () => {
    it('正常系 値が1文字の数字であれば、インスタンス生成が行えること', () => {
      expect(PairName.build('1')).toBeInstanceOf(PairName);
    });

    it('異常系 値が2文字以上の場合、インスタンス生成が行えないこと', () => {
      try {
        PairName.build('12');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ペア名は1文字の数字のみが許可されています。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });

    it('異常系 値に数字以外の文字が含まれている場合、インスタンス生成が行えないこと', () => {
      try {
        PairName.build('a');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ペア名は1文字の数字のみが許可されています。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(PairName.rebuild('🙅🙅🙅🙅')).toBeInstanceOf(PairName);
    });
  });
});
