import { GetParticipantsUsecase } from './get-participants-usecase';
import { ParticipantQueryService } from '../../infra/db/query-service/participant-query-service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
jest.mock('../../infra/db/query-service/participant-query-service');

describe('GetParticipantsUsecase', () => {
  let mockQueryService: jest.MockedObjectDeep<ParticipantQueryService>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockQueryService = jest.mocked(new ParticipantQueryService(prisma));
  });

  describe('do', () => {
    it('正常系 ParticipantQueryService.findAllを1回コールすること', async () => {
      // Act
      const usecase = new GetParticipantsUsecase(mockQueryService);
      await usecase.do();

      // Assert
      expect(mockQueryService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
