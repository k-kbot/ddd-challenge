import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TeamsController } from './controller/team/teams.controller';
import { PairsController } from './controller/pair/pairs.controller';
import { ParticipantsController } from './controller/participant/participants.controller';

@Module({
  imports: [],
  controllers: [TeamsController, PairsController, ParticipantsController],
  providers: [PrismaService],
})
export class AppModule {}
