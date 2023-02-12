import { PairName } from './pair-name';

describe('PairName', () => {
  describe('build', () => {
    it('正常系 値が1文字の数字であれば、インスタンス生成が行えること', () => {
      expect(PairName.build('1')).toBeInstanceOf(PairName);
    });

    it('異常系 値が2文字を超えた場合、インスタンス生成が行えないこと', () => {
      expect(() => PairName.build('12')).toThrow(
        'ペア名は1文字の数字のみが許可されています。',
      );
    });

    it('異常系 値に数字以外の文字が含まれている場合、インスタンス生成が行えないこと', () => {
      expect(() => PairName.build('a')).toThrow(
        'ペア名は1文字の数字のみが許可されています。',
      );
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(PairName.rebuild('🙅🙅🙅🙅')).toBeInstanceOf(PairName);
    });
  });
});
