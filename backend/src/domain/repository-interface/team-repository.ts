import { Team } from '../team/team';

export interface ITeamRepository {
  findAll(): Promise<Team[]>;
  update(team: Team): Promise<boolean>;
}
