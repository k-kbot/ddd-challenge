import { TeamQueryService } from './team-query-service';
import { prisma } from '../../../../testUtils/prisma';
import { TeamDto } from '../../../usecase/team/query-service-interface/team-query-service';

describe('TeamQueryService', () => {
  const teamQueryService = new TeamQueryService(prisma);

  afterEach(async () => {
    await prisma.team.deleteMany({});
  });

  describe('findAll', () => {
    it('正常系 全てのチームを取得できること', async () => {
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

      // Act
      const actual = await teamQueryService.findAll();

      // Assert
      expect(actual).toStrictEqual([
        new TeamDto({
          id: '1',
          name: '001',
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
        }),
        new TeamDto({
          id: '2',
          name: '002',
          createdAt: new Date('2023-02-01T09:00:00Z'),
          updatedAt: new Date('2023-02-01T09:00:00Z'),
        }),
      ]);
    });
  });

  describe('findById', () => {
    it('正常系 idでチームを取得できること', async () => {
      // Arrange
      const id = '1';

      await prisma.team.create({
        data: {
          id,
          name: '001',
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
        },
      });

      // Act
      const actual = await teamQueryService.findById(id);

      // Assert
      expect(actual).toStrictEqual(
        new TeamDto({
          id,
          name: '001',
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
        }),
      );
    });

    it('正常系 idが存在しない場合はundefinedを返すこと', async () => {
      // Arrange
      await prisma.team.create({
        data: {
          id: '1',
          name: '001',
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
        },
      });

      // Act
      const actual = await teamQueryService.findById('2');

      // Assert
      expect(actual).toBeUndefined();
    });
  });

  describe('findByName', () => {
    it('正常系 nameでチームを取得できること', async () => {
      // Arrange
      const name = '001';

      await prisma.team.create({
        data: {
          id: '1',
          name,
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
        },
      });

      // Act
      const actual = await teamQueryService.findByName(name);

      // Assert
      expect(actual).toStrictEqual(
        new TeamDto({
          id: '1',
          name,
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
        }),
      );
    });

    it('正常系 nameが存在しない場合はundefinedを返すこと', async () => {
      // Arrange
      await prisma.team.create({
        data: {
          id: '1',
          name: '001',
          createdAt: '2023-01-01T09:00:00Z',
          updatedAt: '2023-01-01T09:00:00Z',
        },
      });

      // Act
      const actual = await teamQueryService.findByName('002');

      // Assert
      expect(actual).toBeUndefined();
    });
  });
});
