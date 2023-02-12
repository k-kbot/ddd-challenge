import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TeamsController } from './controller/team/teams.controller';
import { PairsController } from './controller/pair/pairs.controller';

@Module({
  imports: [],
  controllers: [TeamsController, PairsController],
  providers: [PrismaService],
})
export class AppModule {}
