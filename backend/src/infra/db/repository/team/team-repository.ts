import { PrismaClient } from '@prisma/client';
import {
  ITeamRepository,
  TeamDto,
} from '../../../../domain/repository-interface/team-repository';
import { Team } from '../../../../domain/team/team';

export class TeamRepository implements ITeamRepository {
  constructor(private prismaClient: PrismaClient) {}

  async findAll(): Promise<TeamDto[]> {
    const teams = await this.prismaClient.team.findMany();
    return teams.map(
      (team) =>
        new TeamDto({
          id: team.id,
          name: team.name,
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
        }),
    );
  }

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
