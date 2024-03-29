import { PairQueryService } from './pair-query-service';
import { prisma } from '../../../../testUtils/prisma';
import { PairDto } from '../../../usecase/pair/query-service-interface/pair-query-service';

describe('PairQueryService', () => {
  const pairQueryInterface = new PairQueryService(prisma);

  afterEach(async () => {
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud#cascading-deletes-deleting-related-records
    const deleteParticipants = prisma.participant.deleteMany({});
    const deletePairs = prisma.pair.deleteMany({});
    const deleteTeams = prisma.team.deleteMany({});

    await prisma.$transaction([deleteParticipants, deletePairs, deleteTeams]);
  });

  describe('findAll', () => {
    it('正常系 全てのペアを取得できること', async () => {
      // Arrange
      await prisma.team.createMany({
        data: [
          {
            id: '1',
            name: '001',
            createdAt: '2023-01-01T09:00:00Z',
            updatedAt: '2023-01-01T09:00:00Z',
          },
          {
            id: '2',
            name: '002',
            createdAt: '2023-02-01T09:00:00Z',
            updatedAt: '2023-02-01T09:00:00Z',
          },
        ],
      });

      await prisma.pair.create({
        include: {
          participants: true,
        },
        data: {
          id: '1',
          name: '1',
          participants: {
            create: [
              {
                id: '1',
                name: '山田太郎',
                email: 'taro@example.com',
                status: 1,
                createdAt: '2023-01-01T09:00:00Z',
                updatedAt: '2023-01-01T09:00:00Z',
                teamId: '1',
              },
              {
                id: '2',
                name: '鈴木二郎',
                email: 'jiro@example.com',
                status: 2,
                createdAt: '2023-01-01T09:00:00Z',
                updatedAt: '2023-01-01T09:00:00Z',
                teamId: '1',
              },
            ],
          },
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
          teamId: '1',
        },
      });

      await prisma.pair.create({
        include: {
          participants: true,
        },
        data: {
          id: '2',
          name: '2',
          participants: {
            create: [
              {
                id: '3',
                name: 'Alice',
                email: 'alice@example.com',
                status: 1,
                createdAt: '2023-01-01T09:00:00Z',
                updatedAt: '2023-01-01T09:00:00Z',
                teamId: '2',
              },
              {
                id: '4',
                name: 'Bob',
                email: 'bob@example.com',
                status: 2,
                createdAt: '2023-01-01T09:00:00Z',
                updatedAt: '2023-01-01T09:00:00Z',
                teamId: '2',
              },
            ],
          },
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
          teamId: '2',
        },
      });

      // Act
      const actual = await pairQueryInterface.findAll();

      // Assert
      expect(actual).toStrictEqual([
        new PairDto({
          id: '1',
          name: '1',
          participants: [
            {
              id: '1',
              name: '山田太郎',
              email: 'taro@example.com',
              status: 1,
              createdAt: new Date('2023-01-01T09:00:00Z'),
              updatedAt: new Date('2023-01-01T09:00:00Z'),
              teamId: '1',
              pairId: '1',
            },
            {
              id: '2',
              name: '鈴木二郎',
              email: 'jiro@example.com',
              status: 2,
              createdAt: new Date('2023-01-01T09:00:00Z'),
              updatedAt: new Date('2023-01-01T09:00:00Z'),
              teamId: '1',
              pairId: '1',
            },
          ],
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
          teamId: '1',
        }),
        new PairDto({
          id: '2',
          name: '2',
          participants: [
            {
              id: '3',
              name: 'Alice',
              email: 'alice@example.com',
              status: 1,
              createdAt: new Date('2023-01-01T09:00:00Z'),
              updatedAt: new Date('2023-01-01T09:00:00Z'),
              teamId: '2',
              pairId: '2',
            },
            {
              id: '4',
              name: 'Bob',
              email: 'bob@example.com',
              status: 2,
              createdAt: new Date('2023-01-01T09:00:00Z'),
              updatedAt: new Date('2023-01-01T09:00:00Z'),
              teamId: '2',
              pairId: '2',
            },
          ],
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
          teamId: '2',
        }),
      ]);
    });
  });
});
