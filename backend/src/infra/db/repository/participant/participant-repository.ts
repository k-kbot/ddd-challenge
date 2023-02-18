import { PrismaClient } from '@prisma/client';
import {
  IParticipantRepository,
  ParticipantDto,
} from '../../../../domain/repository-interface/participant-repository';

export class ParticipantRepository implements IParticipantRepository {
  constructor(private prismaClient: PrismaClient) {}

  async findAll(): Promise<ParticipantDto[]> {
    const participants = await this.prismaClient.participant.findMany({});

    return participants.map(
      (participant) =>
        new ParticipantDto({
          id: participant.id,
          name: participant.name,
          email: participant.email,
          status: participant.status,
          createdAt: participant.createdAt,
          updatedAt: participant.updatedAt,
          pairId: participant.pairId,
        }),
    );
  }
}
