import { HttpStatus, Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { ResponseModel } from 'src/models/response.model';

@Injectable() 
export class ResponseMapper {
    public successResponse(message: string, statusCode: HttpStatus, data: any): ResponseModel  {
        return Builder(ResponseModel)
        .data(data)
        .message(message)
        .statusCode(statusCode)
        .build()
    }

    public errorResponse(message: string, statusCode: HttpStatus, error: any): ResponseModel {
        return Builder(ResponseModel)
        .error(error)
        .message(message)
        .statusCode(statusCode)
        .build()
    }
}