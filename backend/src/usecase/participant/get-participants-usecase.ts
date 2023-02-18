import {
  IParticipantRepository,
  ParticipantDto,
} from '../../domain/repository-interface/participant-repository';

export class GetParticipantsUsecase {
  constructor(private participantRepository: IParticipantRepository) {}

  async do(): Promise<ParticipantDto[]> {
    return await this.participantRepository.findAll();
  }
}
