import { TeamDto } from '../../../usecase/team/query-service-interface/team-query-service';

export class GetTeamsResponse {
  teams: Team[];

  constructor(teamsDtos: TeamDto[]) {
    this.teams = teamsDtos.map(({ id, name, createdAt, updatedAt }) => {
      return new Team({
        id,
        name,
        createdAt,
        updatedAt,
      });
    });
  }
}

class Team {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
