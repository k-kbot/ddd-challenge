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

  async findById(id: string): Promise<TeamDto | undefined> {
    const team = await this.prismaClient.team.findUnique({
      where: {
        id,
      },
    });

    if (!team) return undefined;

    return new TeamDto({
      id: team.id,
      name: team.name,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    });
  }

  async findByName(name: string): Promise<TeamDto | undefined> {
    const team = await this.prismaClient.team.findFirst({
      where: {
        name,
      },
    });

    if (!team) return undefined;

    return new TeamDto({
      id: team.id,
      name: team.name,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
    });
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
