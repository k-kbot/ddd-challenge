import { PrismaClient } from '@prisma/client';
import {
  IPairRepository,
  PairDto,
} from '../../../../domain/repository-interface/pair-repository';

export class PairRepository implements IPairRepository {
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
        }),
    );
  }
}
