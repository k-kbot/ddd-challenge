import { GetPairsUsecase } from './get-pairs-usecase';
import { PairRepository } from '../../infra/db/repository/pair-repository';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
jest.mock('../../infra/db/repository/pair-repository');

describe('GetPairsUsecase', () => {
  let mockRepository: jest.MockedObjectDeep<PairRepository>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockRepository = jest.mocked(new PairRepository(prisma));
  });

  describe('do', () => {
    it('正常系 PairRepository.findAllを1回コールすること', async () => {
      // Act
      const usecase = new GetPairsUsecase(mockRepository);
      await usecase.do();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
