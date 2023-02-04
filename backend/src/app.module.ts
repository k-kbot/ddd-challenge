import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TeamsController } from './controller/team/teams.controller';

@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [PrismaService],
})
export class AppModule {}
