import { Pair } from './pair';
import { PairId } from './pair-id';
import { PairName } from './pair-name';

describe('Pair', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Pair.build({ id: PairId.build(), name: PairName.build('2') }),
      ).toBeInstanceOf(Pair);
    });
  });

  describe('rebuild', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Pair.rebuild({
          id: PairId.rebuild('id'),
          name: PairName.rebuild('🙅'),
          createdAt: new Date('2000/01/01 12:34:56'),
          updatedAt: new Date('2020/12/31 12:34:56'),
        }),
      ).toBeInstanceOf(Pair);
    });
  });
});
