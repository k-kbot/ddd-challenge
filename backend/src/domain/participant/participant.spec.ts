import { Participant } from './participant';
import { ParticipantId } from './participant-id';
import { ParticipantName } from './participant-name';
import { ParticipantEmail } from './participant-email';
import { ParticipantStatus } from './participant-status';
import { TeamId } from '../team/team-id';
import { DomainException } from '../shared/domain-exception';

describe('Participant', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Participant.build({
          id: ParticipantId.build(),
          name: ParticipantName.build('山田太郎'),
          email: ParticipantEmail.build('taro@example.com'),
          status: ParticipantStatus.build('active'),
          teamId: TeamId.build(),
        }),
      ).toBeInstanceOf(Participant);
    });

    it('異常系 ステータスが在籍中でチームの所属していなければインスタンス生成が行えないこと', () => {
      try {
        Participant.build({
          id: ParticipantId.build(),
          name: ParticipantName.build('山田太郎'),
          email: ParticipantEmail.build('taro@example.com'),
          status: ParticipantStatus.build('active'),
          teamId: undefined,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ステータスが在籍中であればチームに所属している必要があります。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });

    it('異常系 ステータスが在籍中以外でチームの所属していればインスタンス生成が行えないこと', () => {
      try {
        Participant.build({
          id: ParticipantId.build(),
          name: ParticipantName.build('山田太郎'),
          email: ParticipantEmail.build('taro@example.com'),
          status: ParticipantStatus.build('inactive'),
          teamId: TeamId.build(),
        });
      } catch (e) {
        expect(e).toBeInstanceOf(DomainException);
        expect((e as DomainException).errorMessage).toBe(
          'ステータスが在籍中でなければチームに所属できません。',
        );
        expect((e as DomainException).statusCode).toBe(400);
      }
    });
  });

  describe('rebuild', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Participant.rebuild({
          id: ParticipantId.rebuild('id'),
          name: ParticipantName.rebuild('🙅'),
          email: ParticipantEmail.rebuild('taro@'),
          status: ParticipantStatus.rebuild('foo'),
          createdAt: new Date('2000/01/01 12:34:56'),
          updatedAt: new Date('2020/12/31 12:34:56'),
          teamId: TeamId.rebuild('teamId'),
        }),
      ).toBeInstanceOf(Participant);
    });
  });
});
