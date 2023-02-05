import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeamRequest {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;
}
