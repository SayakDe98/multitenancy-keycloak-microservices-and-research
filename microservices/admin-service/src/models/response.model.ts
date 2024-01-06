import { HttpStatus } from "@nestjs/common";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ResponseModel {
    @IsString()
    @IsNotEmpty()
    public message: string;

    @IsEnum(HttpStatus)
    public statusCode: HttpStatus;

    @IsOptional()
    public data: any;

    @IsOptional()
    public error: any;
    
}