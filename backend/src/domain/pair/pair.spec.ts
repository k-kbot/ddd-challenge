import { Pair } from './pair';
import { PairId } from './pair-id';
import { PairName } from './pair-name';
import { Participant } from '../participant/participant';
import { ParticipantId } from '../participant/participant-id';
import { ParticipantName } from '../participant/participant-name';
import { ParticipantEmail } from '../participant/participant-email';
import { ParticipantStatus } from '../participant/participant-status';
import { TestParticipantFactory } from '../participant/test-participant-factory';
import { TeamId } from '../team/team-id';
import { DomainException } from '../shared/domain-exception';

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
              teamId: TeamId.rebuild('001'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('鈴木二郎'),
              email: ParticipantEmail.build('jiro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
          ],
          teamId: TeamId.build(),
        }),
      ).toBeInstanceOf(Pair);
    });

    it('異常系 参加者が2名未満ではインスタンス生成が行えないこと', () => {
      try {
        Pair.build({
          id: PairId.build(),
          name: PairName.build('2'),
          participants: [
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('山田太郎'),
              email: ParticipantEmail.build('taro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
          ],
          teamId: TeamId.build(),
        });
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ペアに所属できる参加者は2~3名です。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });

    it('異常系 参加者が4名以上ではインスタンス生成が行えないこと', () => {
      try {
        Pair.build({
          id: PairId.build(),
          name: PairName.build('2'),
          participants: [
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('山田太郎'),
              email: ParticipantEmail.build('taro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('鈴木二郎'),
              email: ParticipantEmail.build('jiro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('佐藤三郎'),
              email: ParticipantEmail.build('saburo@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('高橋四郎'),
              email: ParticipantEmail.build('shiro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
          ],
          teamId: TeamId.build(),
        });
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ペアに所属できる参加者は2~3名です。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });

    it('異常系 ステータスが在籍中ではない参加者がいるとインスタンス生成が行えないこと', () => {
      try {
        Pair.build({
          id: PairId.build(),
          name: PairName.build('2'),
          participants: [
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('山田太郎'),
              email: ParticipantEmail.build('taro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('鈴木二郎'),
              email: ParticipantEmail.build('jiro@example.com'),
              status: ParticipantStatus.build('inactive'),
              teamId: undefined,
            }),
          ],
          teamId: TeamId.build(),
        });
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ステータスが在籍中ではない参加者はペアに所属できません。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });

    it('異常系 参加者が異なるチームに所属しているいるとインスタンス生成が行えないこと', () => {
      try {
        Pair.build({
          id: PairId.build(),
          name: PairName.build('2'),
          participants: [
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('山田太郎'),
              email: ParticipantEmail.build('taro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('001'),
            }),
            Participant.build({
              id: ParticipantId.build(),
              name: ParticipantName.build('鈴木二郎'),
              email: ParticipantEmail.build('jiro@example.com'),
              status: ParticipantStatus.build('active'),
              teamId: TeamId.rebuild('002'),
            }),
          ],
          teamId: TeamId.build(),
        });
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ペアに所属する参加者は、同じチームに所属している必要があります。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });
  });

  describe('rebuild', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Pair.rebuild({
          id: PairId.rebuild('id'),
          name: PairName.rebuild('🙅'),
          participants: [
            TestParticipantFactory.build({}),
            TestParticipantFactory.build({}),
          ],
          createdAt: new Date('2000/01/01 12:34:56'),
          updatedAt: new Date('2020/12/31 12:34:56'),
          teamId: TeamId.rebuild('teamId'),
        }),
      ).toBeInstanceOf(Pair);
    });
  });
});
