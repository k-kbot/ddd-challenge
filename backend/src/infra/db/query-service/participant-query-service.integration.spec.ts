import { ParticipantQueryService } from './participant-query-service';
import { prisma } from '../../../../testUtils/prisma';
import { ParticipantDto } from '../../../usecase/participant/query-service-interface/participant-query-service';

describe('ParticipantQueryService', () => {
  const participantQueryService = new ParticipantQueryService(prisma);

  afterEach(async () => {
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud#cascading-deletes-deleting-related-records
    const deleteParticipants = prisma.participant.deleteMany({});
    const deletePairs = prisma.pair.deleteMany({});
    const deleteTeams = prisma.team.deleteMany({});

    await prisma.$transaction([deleteParticipants, deletePairs, deleteTeams]);
  });

  describe('findAll', () => {
    it('正常系 全ての参加者を取得できること', async () => {
      // Arrange
      await prisma.team.create({
        data: {
          id: '1',
          name: '001',
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
        },
      });

      await prisma.pair.create({
        data: {
          id: '1',
          name: '1',
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
          teamId: '1',
        },
      });

      await prisma.participant.createMany({
        data: [
          {
            id: '1',
            name: '山田太郎',
            email: 'taro@example.com',
            status: 1,
            createdAt: '2023-01-01T09:00:00Z',
            updatedAt: '2023-01-01T09:00:00Z',
            teamId: '1',
            pairId: '1',
          },
          {
            id: '2',
            name: '鈴木二郎',
            email: 'jiro@example.com',
            status: 2,
            createdAt: '2023-02-01T09:00:00Z',
            updatedAt: '2023-02-01T09:00:00Z',
            teamId: '1',
            pairId: '1',
          },
        ],
      });

      // Act
      const actual = await participantQueryService.findAll();

      // Assert
      expect(actual).toStrictEqual([
        new ParticipantDto({
          id: '1',
          name: '山田太郎',
          email: 'taro@example.com',
          status: 1,
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
          teamId: '1',
          pairId: '1',
        }),
        new ParticipantDto({
          id: '2',
          name: '鈴木二郎',
          email: 'jiro@example.com',
          status: 2,
          createdAt: new Date('2023-02-01T09:00:00Z'),
          updatedAt: new Date('2023-02-01T09:00:00Z'),
          teamId: '1',
          pairId: '1',
        }),
      ]);
    });
  });
});
