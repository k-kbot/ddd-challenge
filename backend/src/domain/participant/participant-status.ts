type ParticipantStatusBuildProps = 'active' | 'inactive' | 'withdrawn';

export class ParticipantStatus {
  private constructor(private status: string) {}

  static build(status: ParticipantStatusBuildProps): ParticipantStatus {
    return new ParticipantStatus(status);
  }

  static rebuild(status: string): ParticipantStatus {
    return new ParticipantStatus(status);
  }

  get value(): string {
    return this.status;
  }
}
