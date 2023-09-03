import {
  ITeamQueryService,
  TeamDto,
} from './query-service-interface/team-query-service';

export class GetTeamsUsecase {
  constructor(private teamQueryService: ITeamQueryService) {}

  async do(): Promise<TeamDto[]> {
    return await this.teamQueryService.findAll();
  }
}
