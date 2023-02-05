import { ITeamRepository } from '../../domain/repository-interface/team-repository';
import { Team } from '../../domain/team/team';
import { TeamName } from '../../domain/team/team-name';
import { TeamId } from '../../domain/team/team-id';

interface IUpdateTeamUsecaseProps {
  id: string;
  name: string;
}

export class UpdateTeamUsecase {
  constructor(private teamRepository: ITeamRepository) {}

  async do(props: IUpdateTeamUsecaseProps): Promise<boolean> {
    const teamDto = await this.teamRepository.findById(props.id);

    if (!teamDto) return false;

    const team = Team.build({
      id: TeamId.rebuild(teamDto.id),
      name: TeamName.build(props.name),
    });

    return await this.teamRepository.update(team);
  }
}
