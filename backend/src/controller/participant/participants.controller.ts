import { Get, Controller } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ParticipantQueryService } from '../../infra/db/query-service/participant-query-service';
import { GetParticipantsUsecase } from '../../usecase/participant/get-participants-usecase';
import { GetParticipantsResponse } from './response/get-participants-response';

@Controller('participants')
export class ParticipantsController {
  @Get()
  async getParticipants(): Promise<GetParticipantsResponse> {
    const prisma = new PrismaClient();
    const participantQueryService = new ParticipantQueryService(prisma);
    const usecase = new GetParticipantsUsecase(participantQueryService);
    const result = await usecase.do();
    return new GetParticipantsResponse(result);
  }
}
