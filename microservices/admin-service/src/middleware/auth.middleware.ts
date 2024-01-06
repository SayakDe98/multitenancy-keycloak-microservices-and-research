import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of } from 'rxjs';
import { KeyCloakService } from 'src/keycloak/keycloakClient.service';
import { ResponseMapper } from 'src/provider-group/mappers/response.mapper';
// import * as bcrypt from 'bcrypt';
// import { HttpError } from 'routing-controllers';
// import { CreateUserDto } from 'src/user/dto/userModel/create-user.dto';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly responseMapper: ResponseMapper,
    private readonly keyCloakService: KeyCloakService
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    try {
      let request = context.switchToHttp().getRequest();
      //use this on controllers where we are not hitting keyCloak endpoint
      if (!request?.headers || !request?.headers['Authorization']) {
        throw new HttpException(
          'Please provide access token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = request?.headers['Authorization']?.split(' ')[1];
      if(!token) {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
      }
      const result = await this.keyCloakService.verifyAdminAccessToken(token);
      if(!result || !result?.data || result?.data?.active === false) {
        throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED);
      }
      return next.handle().pipe();
    } catch (error) {
      return of(this.responseMapper.errorResponse(error?.message, error?.status || HttpStatus.INTERNAL_SERVER_ERROR, error?.response));
    }
  }
}

