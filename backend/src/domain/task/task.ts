import { TaskId } from './task-id';
import { TaskName } from './task-name';

interface TeamProps {
  id: TaskId;
  name: TaskName;
  createdAt: Date;
  updatedAt: Date;
}

type TaskBuildProps = Omit<TeamProps, 'createdAt' | 'updatedAt'>;

export class Task {
  private constructor(private props: TeamProps) {}

  static build(props: TaskBuildProps): Task {
    return new Task({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static rebuild(props: TeamProps): Task {
    return new Task({
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
