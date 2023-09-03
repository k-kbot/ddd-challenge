import { ITeamRepository } from '../../domain/repository-interface/team-repository';
import { ITeamQueryService } from './query-service-interface/team-query-service';
import { Team } from '../../domain/team/team';
import { TeamName } from '../../domain/team/team-name';
import { TeamId } from '../../domain/team/team-id';
import { UniqueTeamNameValidator } from '../../domain/team/unique-team-name-validator';

interface IUpdateTeamUsecaseProps {
  id: string;
  name: string;
}

export class UpdateTeamUsecase {
  constructor(
    private teamQueryService: ITeamQueryService,
    private teamRepository: ITeamRepository,
  ) {}

  async do(props: IUpdateTeamUsecaseProps): Promise<boolean> {
    const validator = new UniqueTeamNameValidator(this.teamQueryService);
    if (await validator.exists(props.name)) {
      throw new Error(`チーム名"${props.name}"は既に存在しています`);
    }

    const teamDto = await this.teamQueryService.findById(props.id);
    if (!teamDto) return false;

    const team = Team.build({
      id: TeamId.rebuild(teamDto.id),
      name: TeamName.build(props.name),
    });

    return await this.teamRepository.update(team);
  }
}
