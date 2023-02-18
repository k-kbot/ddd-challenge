import { ParticipantRepository } from './participant-repository';
import { prisma } from '../../../../../testUtils/prisma';
import { ParticipantDto } from '../../../../domain/repository-interface/participant-repository';

describe('ParticipantRepository', () => {
  const participantRepository = new ParticipantRepository(prisma);

  beforeEach(async () => {
    await prisma.participant.deleteMany({});
  });

  describe('findAll', () => {
    it('正常系 全ての参加者を取得できること', async () => {
      // Arrange
      await prisma.participant.createMany({
        data: [
          {
            id: '1',
            name: '山田太郎',
            email: 'taro@example.com',
            status: 1,
            createdAt: '2023-01-01T09:00:00Z',
            updatedAt: '2023-01-01T09:00:00Z',
            pairId: '1',
          },
          {
            id: '2',
            name: '鈴木二郎',
            email: 'jiro@example.com',
            status: 2,
            createdAt: '2023-02-01T09:00:00Z',
            updatedAt: '2023-02-01T09:00:00Z',
            pairId: '1',
          },
        ],
      });

      // Act
      const actual = await participantRepository.findAll();

      // Assert
      expect(actual).toStrictEqual([
        new ParticipantDto({
          id: '1',
          name: '山田太郎',
          email: 'taro@example.com',
          status: 1,
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
          pairId: '1',
        }),
        new ParticipantDto({
          id: '2',
          name: '鈴木二郎',
          email: 'jiro@example.com',
          status: 2,
          createdAt: new Date('2023-02-01T09:00:00Z'),
          updatedAt: new Date('2023-02-01T09:00:00Z'),
          pairId: '1',
        }),
      ]);
    });
  });
});
