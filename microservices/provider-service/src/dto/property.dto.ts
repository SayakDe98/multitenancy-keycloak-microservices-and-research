import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  property: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
