import { Get, Controller } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TeamRepository } from '../../infra/db/repository/team/team-repository';
import { GetTeamsUsecase } from '../../usecase/team/get-teams-usecase';
import { GetTeamsResponse } from './response/get-teams-response';

@Controller('teams')
export class TeamsController {
  @Get()
  async getTeams(): Promise<GetTeamsResponse> {
    const prisma = new PrismaClient();
    const teamRepository = new TeamRepository(prisma);
    const useCase = new GetTeamsUsecase(teamRepository);
    const result = await useCase.do();
    return new GetTeamsResponse(result);
  }
}
