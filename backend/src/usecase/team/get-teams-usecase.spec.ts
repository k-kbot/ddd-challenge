import { GetTeamsUsecase } from './get-teams-usecase';
import { TeamRepository } from '../../infra/db/repository/team/team-repository';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
jest.mock('../../infra/db/repository/team/team-repository');

describe('GetTeamsUsecase', () => {
  let mockRepository: jest.MockedObjectDeep<TeamRepository>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockRepository = jest.mocked(new TeamRepository(prisma));
  });

  describe('do', () => {
    it('正常系 TeamRepository.findAllを1回コールすること', async () => {
      // Act
      const usecase = new GetTeamsUsecase(mockRepository);
      await usecase.do();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
