export class TeamDto {
  public readonly id: string;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const { id, name, createdAt, updatedAt } = props;
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export interface ITeamQueryService {
  findAll(): Promise<TeamDto[]>;
  findById(id: string): Promise<TeamDto | undefined>;
  findByName(name: string): Promise<TeamDto | undefined>;
}
