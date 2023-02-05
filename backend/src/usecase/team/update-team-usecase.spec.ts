import { UpdateTeamUsecase } from './update-team-usecase';
import { TeamRepository } from '../../infra/db/repository/team/team-repository';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
jest.mock('../../infra/db/repository/team/team-repository');

describe('UpdateTeamUsecase', () => {
  let mockRepository: jest.MockedObjectDeep<TeamRepository>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockRepository = jest.mocked(new TeamRepository(prisma));
  });

  describe('do', () => {
    it('正常系 TeamRepository.findByIdを1回コールすること', async () => {
      // Act
      const usecase = new UpdateTeamUsecase(mockRepository);
      await usecase.do({ id: '1', name: '001' });

      // Assert
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    });

    // TODO: TeamRepository.updateを1回コールすること
    // TeamRepository.findByIdの戻り値がundefinedではないことをモックする必要がある。
  });
});
