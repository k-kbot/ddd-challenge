import { TeamId } from './team-id';
import { TeamName } from './team-name';

interface TeamProps {
  id: TeamId;
  name: TeamName;
  createdAt: Date;
  updatedAt: Date;
}

export class Team {
  private constructor(private props: TeamProps) {}

  static build(props): Team {
    return new Team({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static rebuild(props): Team {
    return new Team({
      ...props,
    });
  }
}
