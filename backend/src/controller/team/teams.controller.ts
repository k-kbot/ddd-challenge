import { Get, Controller, Put, Body, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TeamQueryService } from '../../infra/db/query-service/team-query-service';
import { TeamRepository } from '../../infra/db/repository/team/team-repository';
import { GetTeamsUsecase } from '../../usecase/team/get-teams-usecase';
import { GetTeamsResponse } from './response/get-teams-response';
import { UpdateTeamUsecase } from '../../usecase/team/update-team-usecase';
import { UpdateTeamRequest } from './request/update-team-request';

@Controller('teams')
export class TeamsController {
  @Get()
  async getTeams(): Promise<GetTeamsResponse> {
    const prisma = new PrismaClient();
    const teamQueryService = new TeamQueryService(prisma);
    const usecase = new GetTeamsUsecase(teamQueryService);
    const result = await usecase.do();
    return new GetTeamsResponse(result);
  }

  @Put(':id')
  async updateTeam(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamRequest,
  ): Promise<boolean> {
    const prisma = new PrismaClient();
    const teamQueryService = new TeamQueryService(prisma);
    const teamRepository = new TeamRepository(prisma);
    const usecase = new UpdateTeamUsecase(teamQueryService, teamRepository);
    return await usecase.do({ id, name: updateTeamDto.name });
  }
}
