import {
  IPairQueryService,
  PairDto,
} from './query-service-interface/pair-query-service';

export class GetPairsUsecase {
  constructor(private pairQueryService: IPairQueryService) {}

  async do(): Promise<PairDto[]> {
    return await this.pairQueryService.findAll();
  }
}
