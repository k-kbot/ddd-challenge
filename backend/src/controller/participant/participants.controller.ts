import { Get, Controller } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ParticipantRepository } from '../../infra/db/repository/participant/participant-repository';
import { GetParticipantsUsecase } from '../../usecase/participant/get-participants-usecase';
import { GetParticipantsResponse } from './response/get-participants-response';

@Controller('participants')
export class ParticipantsController {
  @Get()
  async getParticipants(): Promise<GetParticipantsResponse> {
    const prisma = new PrismaClient();
    const participantRepository = new ParticipantRepository(prisma);
    const usecase = new GetParticipantsUsecase(participantRepository);
    const result = await usecase.do();
    return new GetParticipantsResponse(result);
  }
}
