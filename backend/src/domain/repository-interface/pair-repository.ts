import { ParticipantDto } from './participant-repository';

export class PairDto {
  public readonly id: string;
  public readonly name: string;
  public readonly participants: ParticipantDto[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly teamId: string;

  constructor(props: {
    id: string;
    name: string;
    participants: ParticipantDto[];
    createdAt: Date;
    updatedAt: Date;
    teamId: string;
  }) {
    const { id, name, participants, createdAt, updatedAt, teamId } = props;
    this.id = id;
    this.name = name;
    this.participants = participants;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.teamId = teamId;
  }
}

export interface IPairRepository {
  findAll(): Promise<PairDto[]>;
}
