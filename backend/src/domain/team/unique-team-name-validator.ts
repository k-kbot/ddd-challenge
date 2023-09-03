import { ITeamQueryService } from '../../usecase/team/query-service-interface/team-query-service';

export class UniqueTeamNameValidator {
  constructor(private teamQueryService: ITeamQueryService) {}

  async exists(teamName: string): Promise<boolean> {
    const teamDto = await this.teamQueryService.findByName(teamName);
    return !!teamDto;
  }
}
