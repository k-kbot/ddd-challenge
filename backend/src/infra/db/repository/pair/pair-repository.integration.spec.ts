import { PairRepository } from './pair-repository';
import { prisma } from '../../../../../testUtils/prisma';
import { PairDto } from '../../../../domain/repository-interface/pair-repository';

describe('PairRepository', () => {
  const pairRepository = new PairRepository(prisma);

  beforeEach(async () => {
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud#cascading-deletes-deleting-related-records
    const deleteParticipants = prisma.participant.deleteMany({});
    const deletePairs = prisma.pair.deleteMany({});

    await prisma.$transaction([deleteParticipants, deletePairs]);
  });

  describe('findAll', () => {
    it('正常系 全てのペアを取得できること', async () => {
      // Arrange
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
              },
              {
                id: '2',
                name: '鈴木二郎',
                email: 'jiro@example.com',
                status: 2,
                createdAt: '2023-01-01T09:00:00Z',
                updatedAt: '2023-01-01T09:00:00Z',
              },
            ],
          },
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
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
              },
              {
                id: '4',
                name: 'Bob',
                email: 'bob@example.com',
                status: 2,
                createdAt: '2023-01-01T09:00:00Z',
                updatedAt: '2023-01-01T09:00:00Z',
              },
            ],
          },
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
        },
      });

      // Act
      const actual = await pairRepository.findAll();

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
              pairId: '1',
            },
            {
              id: '2',
              name: '鈴木二郎',
              email: 'jiro@example.com',
              status: 2,
              createdAt: new Date('2023-01-01T09:00:00Z'),
              updatedAt: new Date('2023-01-01T09:00:00Z'),
              pairId: '1',
            },
          ],
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
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
              pairId: '2',
            },
            {
              id: '4',
              name: 'Bob',
              email: 'bob@example.com',
              status: 2,
              createdAt: new Date('2023-01-01T09:00:00Z'),
              updatedAt: new Date('2023-01-01T09:00:00Z'),
              pairId: '2',
            },
          ],
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
        }),
      ]);
    });
  });
});
