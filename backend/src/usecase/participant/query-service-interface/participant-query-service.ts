export class ParticipantDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly status: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly teamId: string;
  public readonly pairId: string;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    teamId: string;
    pairId: string;
  }) {
    const { id, name, email, status, createdAt, updatedAt, teamId, pairId } =
      props;
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.teamId = teamId;
    this.pairId = pairId;
  }
}

export interface IParticipantQueryService {
  findAll(): Promise<ParticipantDto[]>;
}
