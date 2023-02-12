import { PairId } from './pair-id';

describe('PairId', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(PairId.build()).toBeInstanceOf(PairId);
    });
  });

  describe('rebuild', () => {
    it('正常系 任意の値でインスタンス生成が行えること', () => {
      expect(PairId.rebuild('id')).toBeInstanceOf(PairId);
    });
  });
});
