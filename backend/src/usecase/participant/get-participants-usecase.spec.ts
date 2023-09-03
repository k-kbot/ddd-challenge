import { GetParticipantsUsecase } from './get-participants-usecase';
import { ParticipantRepository } from '../../infra/db/repository/participant-repository';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client');
jest.mock('../../infra/db/repository/participant-repository');

describe('GetParticipantsUsecase', () => {
  let mockRepository: jest.MockedObjectDeep<ParticipantRepository>;

  beforeAll(() => {
    const prisma = new PrismaClient();
    mockRepository = jest.mocked(new ParticipantRepository(prisma));
  });

  describe('do', () => {
    it('正常系 ParticipantRepository.findAllを1回コールすること', async () => {
      // Act
      const usecase = new GetParticipantsUsecase(mockRepository);
      await usecase.do();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
