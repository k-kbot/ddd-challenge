import { PrismaClient } from '@prisma/client';
import {
  IPairQueryService,
  PairDto,
} from '../../../usecase/pair/query-service-interface/pair-query-service';

export class PairQueryService implements IPairQueryService {
  constructor(private prismaClient: PrismaClient) {}

  async findAll(): Promise<PairDto[]> {
    const pairs = await this.prismaClient.pair.findMany({
      include: {
        participants: true,
      },
    });

    return pairs.map(
      (pair) =>
        new PairDto({
          id: pair.id,
          name: pair.name,
          participants: pair.participants,
          createdAt: pair.createdAt,
          updatedAt: pair.updatedAt,
          teamId: pair.teamId,
        }),
    );
  }
}
