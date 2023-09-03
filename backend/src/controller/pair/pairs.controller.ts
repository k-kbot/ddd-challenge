import { Get, Controller } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PairQueryService } from '../../infra/db/query-service/pair-query-service';
import { GetPairsUsecase } from '../../usecase/pair/get-pairs-usecase';
import { GetPairsResponse } from './response/get-pairs-response';

@Controller('pairs')
export class PairsController {
  @Get()
  async getPairs(): Promise<GetPairsResponse> {
    const prisma = new PrismaClient();
    const pairQueryService = new PairQueryService(prisma);
    const usecase = new GetPairsUsecase(pairQueryService);
    const result = await usecase.do();
    return new GetPairsResponse(result);
  }
}
