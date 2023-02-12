import { ParticipantId } from './participant-id';
import { ParticipantName } from './participant-name';
import { ParticipantEmail } from './participant-email';
import { ParticipantStatus } from './participant-status';

interface ParticipantProps {
  id: ParticipantId;
  name: ParticipantName;
  email: ParticipantEmail;
  status: ParticipantStatus;
  createdAt: Date;
  updatedAt: Date;
}

type ParticipantBuildProps = Omit<ParticipantProps, 'createdAt' | 'updatedAt'>;

export class Participant {
  private constructor(private props: ParticipantProps) {}

  static build(props: ParticipantBuildProps): Participant {
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
      email: this.props.name.value,
      status: this.props.name.value,
    };
  }
}
