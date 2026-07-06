import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRsvpDto {
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  name!: string;

  @IsBoolean()
  attending!: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(20)
  guests?: number;

  @IsOptional()
  @IsString()
  @MaxLength(280)
  message?: string;
}
