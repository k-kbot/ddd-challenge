import { ParticipantDto } from '../../../domain/repository-interface/participant-repository';

export class GetParticipantsResponse {
  participants: Participant[];

  constructor(participantsDtos: ParticipantDto[]) {
    this.participants = participantsDtos.map(
      ({ id, name, email, status, createdAt, updatedAt, pairId }) => {
        return new Participant({
          id,
          name,
          email,
          status,
          createdAt,
          updatedAt,
          pairId,
        });
      },
    );
  }
}

class Participant {
  id: string;
  name: string;
  email: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  pairId: string;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    pairId: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.pairId = props.pairId;
  }
}
