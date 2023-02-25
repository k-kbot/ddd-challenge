import { ParticipantId } from './participant-id';
import { ParticipantName } from './participant-name';
import { ParticipantEmail } from './participant-email';
import { ParticipantStatus } from './participant-status';
import { TeamId } from '../team/team-id';
import { DomainException } from '../shared/domain-exception';

interface ParticipantProps {
  id: ParticipantId;
  name: ParticipantName;
  email: ParticipantEmail;
  status: ParticipantStatus;
  createdAt: Date;
  updatedAt: Date;
  teamId?: TeamId;
}

type ParticipantBuildProps = Omit<ParticipantProps, 'createdAt' | 'updatedAt'>;

export class Participant {
  private constructor(private props: ParticipantProps) {}

  static build(props: ParticipantBuildProps): Participant {
    if (props.status.value === 'active' && props.teamId === undefined) {
      throw new DomainException(
        'ステータスが在籍中であればチームに所属している必要があります。',
        400,
      );
    }

    if (props.status.value !== 'active' && props.teamId !== undefined) {
      throw new DomainException(
        'ステータスが在籍中でなければチームに所属できません。',
        400,
      );
    }

    return new Participant({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static rebuild(props: ParticipantProps): Participant {
    return new Participant({
      ...props,
    });
  }

  getAllProperties() {
    return {
      id: this.props.id.value,
      name: this.props.name.value,
      email: this.props.email.value,
      status: this.props.status.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      teamId: this.props.teamId?.value,
    };
  }
}
