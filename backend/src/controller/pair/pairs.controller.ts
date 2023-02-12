import { Get, Controller } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PairRepository } from '../../infra/db/repository/pair/pair-repository';
import { GetPairsUsecase } from '../../usecase/pair/get-pairs-usecase';
import { GetPairsResponse } from './response/get-pairs-response';

@Controller('pairs')
export class PairsController {
  @Get()
  async getPairs(): Promise<GetPairsResponse> {
    const prisma = new PrismaClient();
    const pairRepository = new PairRepository(prisma);
    const usecase = new GetPairsUsecase(pairRepository);
    const result = await usecase.do();
    return new GetPairsResponse(result);
  }
}
