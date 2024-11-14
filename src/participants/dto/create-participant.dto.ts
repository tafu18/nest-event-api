import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ParticipantType } from '../enums/participant-type.enum';

export class CreateParticipantDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  event_id: number;

  @IsEnum(ParticipantType)
  @IsNotEmpty()
  type: ParticipantType;
}
