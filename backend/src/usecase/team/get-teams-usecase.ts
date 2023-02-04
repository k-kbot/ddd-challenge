import {
  ITeamRepository,
  TeamDto,
} from '../../domain/repository-interface/team-repository';

export class GetTeamsUsecase {
  constructor(private teamRepository: ITeamRepository) {}

  async do(): Promise<TeamDto[]> {
    return await this.teamRepository.findAll();
  }
}
