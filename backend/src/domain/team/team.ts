import { TeamId } from './team-id';
import { TeamName } from './team-name';

interface TeamProps {
  id: TeamId;
  name: TeamName;
  createdAt: Date;
  updatedAt: Date;
}

type TeamBuildProps = Omit<TeamProps, 'createdAt' | 'updatedAt'>;

export class Team {
  private constructor(private props: TeamProps) {}

  static build(props: TeamBuildProps): Team {
    return new Team({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static rebuild(props: TeamProps): Team {
    return new Team({
      ...props,
    });
  }

  getAllProperties() {
    return {
      id: this.props.id.value,
      name: this.props.name.value,
    };
  }
}
