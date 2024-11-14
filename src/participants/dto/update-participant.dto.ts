import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ParticipantType } from '../enums/participant-type.enum';

export class UpdateParticipantDto {
  @IsInt()
  @IsOptional()
  user_id?: number;

  @IsInt()
  @IsOptional()
  event_id?: number;

  @IsEnum(ParticipantType)
  @IsOptional()
  type?: ParticipantType;
}