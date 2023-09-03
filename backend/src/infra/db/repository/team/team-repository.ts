import { PrismaClient } from '@prisma/client';
import { ITeamRepository } from '../../../../domain/repository-interface/team-repository';
import { Team } from '../../../../domain/team/team';

export class TeamRepository implements ITeamRepository {
  constructor(private prismaClient: PrismaClient) {}

  async update(team: Team): Promise<boolean> {
    const { id, name } = team.getAllProperties();
    await this.prismaClient.team.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return true;
  }
}
