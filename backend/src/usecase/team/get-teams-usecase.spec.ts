import { GetTeamsUsecase } from './get-teams-usecase';
import { TeamQueryService } from '../../infra/db/query-service/team-query-service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
jest.mock('../../infra/db/query-service/team-query-service');

describe('GetTeamsUsecase', () => {
  let mockQueryService: jest.MockedObjectDeep<TeamQueryService>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockQueryService = jest.mocked(new TeamQueryService(prisma));
  });

  describe('do', () => {
    it('正常系 TeamQueryService.findAllを1回コールすること', async () => {
      // Act
      const usecase = new GetTeamsUsecase(mockQueryService);
      await usecase.do();

      // Assert
      expect(mockQueryService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
