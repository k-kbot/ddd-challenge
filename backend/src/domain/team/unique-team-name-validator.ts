import { ITeamRepository } from '../repository-interface/team-repository';

export class UniqueTeamNameValidator {
  constructor(private teamRepository: ITeamRepository) {}

  async exists(teamName: string): Promise<boolean> {
    const teamDto = await this.teamRepository.findByName(teamName);
    return !!teamDto;
  }
}
