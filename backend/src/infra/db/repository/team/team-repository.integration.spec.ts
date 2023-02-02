import { TeamRepository } from './team-repository';
import { Team } from '../../../../domain/team/team';
import { TeamId } from '../../../../domain/team/team-id';
import { TeamName } from '../../../../domain/team/team-name';
import { prisma } from '../../../../../testUtils/prisma';

describe('TeamRepository', () => {
  const teamRepository = new TeamRepository(prisma);

  beforeEach(async () => {
    await prisma.team.deleteMany({});
  });

  describe('findAll', () => {
    it('正常系', async () => {
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
      const actual = await teamRepository.findAll();

      // Assert
      expect(actual).toStrictEqual([
        Team.rebuild({
          id: TeamId.rebuild('1'),
          name: TeamName.rebuild('001'),
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T09:00:00Z'),
        }),
        Team.rebuild({
          id: TeamId.rebuild('2'),
          name: TeamName.rebuild('002'),
          createdAt: new Date('2023-02-01T09:00:00Z'),
          updatedAt: new Date('2023-02-01T09:00:00Z'),
        }),
      ]);
    });
  });

  describe('update', () => {
    it('正常系', async () => {
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

      const team = Team.rebuild({
        id: TeamId.rebuild(id),
        name: TeamName.rebuild('002'),
        createdAt: new Date('2023-01-01T09:00:00Z'),
        updatedAt: new Date('2023-01-01T09:00:00Z'),
      });

      // Act
      const actual = await teamRepository.update(team);

      // Assert
      expect(actual).toBe(true);
    });
  });
});