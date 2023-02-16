import { Pair } from './pair';
import { PairId } from './pair-id';
import { PairName } from './pair-name';
import { Participant } from '../participant/participant';
import { ParticipantId } from '../participant/participant-id';
import { ParticipantName } from '../participant/participant-name';
import { ParticipantEmail } from '../participant/participant-email';
import { ParticipantStatus } from '../participant/participant-status';

describe('Pair', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Pair.build({
          id: PairId.build(),
          name: PairName.build('2'),
          participants: [
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('山田太郎'),
              email: ParticipantEmail.build('taro@example.com'),
              status: ParticipantStatus.build('active'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('鈴木二郎'),
              email: ParticipantEmail.build('jiro@example.com'),
              status: ParticipantStatus.build('inactive'),
            }),
          ],
        }),
      ).toBeInstanceOf(Pair);
    });

    it('異常系 参加者が2名未満ではインスタンス生成が行えないこと', () => {
      expect(() =>
        Pair.build({
          id: PairId.build(),
          name: PairName.build('2'),
          participants: [
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('山田太郎'),
              email: ParticipantEmail.build('taro@example.com'),
              status: ParticipantStatus.build('active'),
            }),
          ],
        }),
      ).toThrow('ペアに所属できる参加者は2~3名です');
    });

    it('異常系 参加者が4名以上ではインスタンス生成が行えないこと', () => {
      expect(() =>
        Pair.build({
          id: PairId.build(),
          name: PairName.build('2'),
          participants: [
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('山田太郎'),
              email: ParticipantEmail.build('taro@example.com'),
              status: ParticipantStatus.build('active'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('鈴木二郎'),
              email: ParticipantEmail.build('jiro@example.com'),
              status: ParticipantStatus.build('active'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('佐藤三郎'),
              email: ParticipantEmail.build('saburo@example.com'),
              status: ParticipantStatus.build('active'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('高橋四郎'),
              email: ParticipantEmail.build('shiro@example.com'),
              status: ParticipantStatus.build('active'),
            }),
          ],
        }),
      ).toThrow('ペアに所属できる参加者は2~3名です');
    });
  });

  describe('rebuild', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Pair.rebuild({
          id: PairId.rebuild('id'),
          name: PairName.rebuild('🙅'),
          participants: [
            Participant.rebuild({
              id: ParticipantId.rebuild('id'),
              name: ParticipantName.rebuild('山田太郎'),
              email: ParticipantEmail.rebuild('taro@example.com'),
              status: ParticipantStatus.rebuild('active'),
              createdAt: new Date('2000/01/01 12:34:56'),
              updatedAt: new Date('2020/12/31 12:34:56'),
            }),
            Participant.rebuild({
              id: ParticipantId.rebuild('id'),
              name: ParticipantName.rebuild('鈴木二郎'),
              email: ParticipantEmail.rebuild('jiro@example.com'),
              status: ParticipantStatus.rebuild('inactive'),
              createdAt: new Date('2000/01/01 12:34:56'),
              updatedAt: new Date('2020/12/31 12:34:56'),
            }),
          ],
          createdAt: new Date('2000/01/01 12:34:56'),
          updatedAt: new Date('2020/12/31 12:34:56'),
        }),
      ).toBeInstanceOf(Pair);
    });
  });
});
