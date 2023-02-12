import {
  IPairRepository,
  PairDto,
} from '../../domain/repository-interface/pair-repository';

export class GetPairsUsecase {
  constructor(private pairRepository: IPairRepository) {}

  async do(): Promise<PairDto[]> {
    return await this.pairRepository.findAll();
  }
}
