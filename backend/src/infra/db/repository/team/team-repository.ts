import { PrismaClient } from '@prisma/client';
import { ITeamRepository } from '../../../../domain/repository-interface/team-repository';
import { Team } from '../../../../domain/team/team';
import { TeamId } from '../../../../domain/team/team-id';
import { TeamName } from '../../../../domain/team/team-name';

export class TeamRepository implements ITeamRepository {
  constructor(private prismaClient: PrismaClient) {}

  async findAll(): Promise<Team[]> {
    const teams = await this.prismaClient.team.findMany();
    return teams.map((team) =>
      Team.rebuild({
        id: TeamId.rebuild(team.id),
        name: TeamName.rebuild(team.name),
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
