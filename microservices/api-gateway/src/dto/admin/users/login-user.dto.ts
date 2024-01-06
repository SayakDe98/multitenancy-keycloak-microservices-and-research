import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}