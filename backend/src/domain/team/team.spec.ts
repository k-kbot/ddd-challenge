import { Team } from './team';
import { TeamId } from './team-id';
import { TeamName } from './team-name';

describe('Team', () => {
  describe('build', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Team.build({ id: TeamId.build(), name: TeamName.build('2') }),
      ).toBeInstanceOf(Team);
    });
  });

  describe('rebuild', () => {
    it('正常系 インスタンス生成が行えること', () => {
      expect(
        Team.rebuild({
          id: TeamId.rebuild('id'),
          name: TeamName.rebuild('🙅'),
          createdAt: new Date('2000/01/01 12:34:56'),
          updatedAt: new Date('2020/12/31 12:34:56'),
        }),
      ).toBeInstanceOf(Team);
    });
  });
});
