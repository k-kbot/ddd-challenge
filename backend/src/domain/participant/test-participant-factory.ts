import { Participant } from './participant';
import { ParticipantId } from './participant-id';
import { ParticipantName } from './participant-name';
import { ParticipantEmail } from './participant-email';
import { ParticipantStatus } from './participant-status';
import { TeamId } from '../team/team-id';

export class TestParticipantFactory {
  static build({
    id = '1',
    name = '山田太郎',
    email = 'taro@example.com',
    status = 'active',
    createdAt = new Date(),
    updatedAt = new Date(),
    teamId = '1',
  }): Participant {
    return Participant.rebuild({
      id: ParticipantId.rebuild(id),
      name: ParticipantName.rebuild(name),
      email: ParticipantEmail.rebuild(email),
      status: ParticipantStatus.rebuild(status),
      createdAt,
      updatedAt,
      teamId: TeamId.rebuild(teamId),
    });
  }
}
