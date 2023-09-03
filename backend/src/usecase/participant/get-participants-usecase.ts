import {
  IParticipantQueryService,
  ParticipantDto,
} from './query-service-interface/participant-query-service';

export class GetParticipantsUsecase {
  constructor(private participantQueryService: IParticipantQueryService) {}

  async do(): Promise<ParticipantDto[]> {
    return await this.participantQueryService.findAll();
  }
}
