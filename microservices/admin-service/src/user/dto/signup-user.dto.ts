import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { RoleEntity } from "src/entities/role.entity";
import { UserRoles } from "src/utils/userRoles";

export class SignupUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  roles: string[];
}