import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateProviderGroupDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  rootUrl: string;

  @IsString()
  baseUrl: string;

  @IsBoolean()
  alwaysDisplayInConsole: boolean;
}
