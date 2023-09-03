import { GetPairsUsecase } from './get-pairs-usecase';
import { PairQueryService } from '../../infra/db/query-service/pair-query-service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
jest.mock('../../infra/db/query-service/pair-query-service');

describe('GetPairsUsecase', () => {
  let mockQueryService: jest.MockedObjectDeep<PairQueryService>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockQueryService = jest.mocked(new PairQueryService(prisma));
  });

  describe('do', () => {
    it('正常系 PairQueryService.findAllを1回コールすること', async () => {
      // Act
      const usecase = new GetPairsUsecase(mockQueryService);
      await usecase.do();

      // Assert
      expect(mockQueryService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
