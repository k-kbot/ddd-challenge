import { UpdateTeamUsecase } from './update-team-usecase';
import { TeamQueryService } from '../../infra/db/query-service/team-query-service';
import { PrismaClient } from '@prisma/client';
import { TeamRepository } from '../../infra/db/repository/team/team-repository';

jest.mock('@prisma/client');
jest.mock('../../infra/db/query-service/team-query-service');

describe('UpdateTeamUsecase', () => {
  let mockQueryService: jest.MockedObjectDeep<TeamQueryService>;
  let mockRepository: jest.MockedObjectDeep<TeamRepository>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockQueryService = jest.mocked(new TeamQueryService(prisma));
  });

  describe('do', () => {
    it('正常系 TeamQueryService.findByIdを1回コールすること', async () => {
      // Act
      const usecase = new UpdateTeamUsecase(mockQueryService, mockRepository);
      await usecase.do({ id: '1', name: '001' });

      // Assert
      expect(mockQueryService.findById).toHaveBeenCalledTimes(1);
    });

    // TODO: TeamRepository.updateを1回コールすること
    // TeamQueryService.findByIdの戻り値がundefinedではないことをモックする必要がある。
  });
});
