import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWishDto {
  @IsOptional()
  @IsString()
  @MaxLength(40)
  name?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(280)
  message!: string;
}
