import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProviderGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  rootUrl: string;

  @ApiProperty()
  @IsString()
  baseUrl: string;

  @ApiProperty()
  @IsBoolean()
  alwaysDisplayInConsole: boolean;
}
