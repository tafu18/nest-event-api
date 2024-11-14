import {
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
  IsInt,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsInt()
  @IsOptional()
  companyId?: number;
}
