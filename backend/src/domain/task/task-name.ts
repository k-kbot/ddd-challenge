export class TaskName {
  private constructor(private name: string) {}

  static build(name: string): TaskName {
    return new TaskName(name);
  }

  static rebuild(name: string): TaskName {
    return new TaskName(name);
  }

  get value(): string {
    return this.name;
  }
}
