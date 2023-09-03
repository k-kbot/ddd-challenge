import { PrismaClient } from '@prisma/client';
import {
  IParticipantQueryService,
  ParticipantDto,
} from '../../../usecase/participant/query-service-interface/participant-query-service';

export class ParticipantQueryService implements IParticipantQueryService {
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
          teamId: participant.teamId,
          pairId: participant.pairId,
        }),
    );
  }
}
