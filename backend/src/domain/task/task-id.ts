import { v4 as uuidv4 } from 'uuid';

export class TaskId {
  private constructor(private readonly id: string) {
    this.id = id;
  }

  static build(): TaskId {
    return new TaskId(uuidv4());
  }

  static rebuild(value: string): TaskId {
    return new TaskId(value);
  }

  get value(): string {
    return this.id;
  }
}
