import { Controller, Headers, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { delay, of } from "rxjs";
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { AuthInterceptor } from 'src/middleware/auth.middleware';
import { ResponseMapper } from 'src/provider-group/mappers/response.mapper';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseMapper: ResponseMapper,
  ) {}

  @MessagePattern({ cmd: 'ping' })
  ping(_: any) {
    return of(this.userService.getHello()).pipe(delay(1000));
  }

  @MessagePattern({ cmd: 'login-user' })
  async login(@Payload() payload) {
    try {
      const response = await this.userService.login(payload?.data);
      return of(
        this.responseMapper.successResponse(
          'User logged in successfully',
          HttpStatus.ACCEPTED,
          response,
        ),
      );
    } catch (error) {
      return of(
        this.responseMapper.errorResponse(
          'Failed to login user',
          error?.response?.status || HttpStatus.UNAUTHORIZED,
          error?.message,
        ),
      );
    }
  }
  //   return {
  //     message: 'User logged in successfully',
  //     statusCode: HttpStatus.ACCEPTED,
  //     data: loginUser?.data,
  //   };
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     message: 'Failed to login user',
  //     statusCode: error?.response?.status || HttpStatus.UNAUTHORIZED,
  //   };
  // }

  // @MessagePattern({ cmd: 'attach-user-to-certain-client' })
  // async attachUserToCertainClient(@Payload() payload) {
  //   const token = payload?.headers?.Authorization;
  //   delete payload?.headers;
  //   return of(
  //     await this.userService.attachUserToCertainClient(payload?.data, token),
  //   );
  // }
  @MessagePattern({ cmd: 'logout-user' })
  async logout(@Payload() payload) {
    try {
      console.log('here', payload);
      const response = await this.userService.logout(payload?.data?.userId, payload?.headers?.Authorization);
      return of(
        this.responseMapper.successResponse(
          'User logged out successfully',
          HttpStatus.OK,
          response,
        ),
      );
    } catch (error) {
      return of(
        this.responseMapper.errorResponse(
          'Failed to logout user',
          error?.response?.status || HttpStatus.UNAUTHORIZED,
          error?.message,
        ),
      );
    }
  }
  @MessagePattern({ cmd: 'signup-user' })
  async createAdminUser(@Payload() payload) {
    const password = payload?.data?.password || '';
    delete payload?.data?.password;
    const updatedPayload = payload?.data;
    const token = payload?.headers?.Authorization;
    delete payload?.headers;
    try {
      const response = await this.userService.createAdminUser(
        updatedPayload,
        password,
        token,
      );
      return of(
        this.responseMapper.successResponse(
          'User created successfully',
          HttpStatus.CREATED,
          response,
        ),
      );
    } catch (error) {
      return {
        message: 'Failed to create user',
        statusCode: error?.response?.status || HttpStatus.BAD_REQUEST,
        error: error?.message,
      };
    }
  }

  @MessagePattern({ cmd: 'signup-provider-user' })
  async createProviderUser(@Payload() payload) {
    const password = payload?.data?.password || '';
    delete payload?.data?.password;
    const updatedPayload = payload?.data;
    const token = payload?.headers?.Authorization;
    const clientName = payload?.headers['x-tenant-id'];
    // delete payload?.headers;
    // return of(
    //   await this.userService.createProviderUser(
    //     updatedPayload,
    //     password,
    //     token,
    //     clientName,
    //   ),
    // );
    // return {
    //   message: 'User created successfully',
    //   statusCode: HttpStatus.CREATED,
    //   data: savedUser,
    // };
    //   console.log(error);
    //   return {
    //     message: 'Failed to create user',
    //     statusCode: error?.response?.status || HttpStatus.BAD_REQUEST,
    //     error: error?.message,
    //   };

    try {
      const response = await this.userService.createProviderUser(
        updatedPayload,
        password,
        token,
        clientName,
      );
      return of(
        this.responseMapper.successResponse(
          'User created successfully',
          HttpStatus.CREATED,
          response,
        ),
      );
    } catch (error) {
      //   console.log(error);
      //   return {
      //     message: 'Failed to create user',
      //     statusCode: error?.response?.status || HttpStatus.BAD_REQUEST,
      //     error: error?.message,
      //   };
      return of(
        this.responseMapper.errorResponse(
          'Failed to create user',
          error?.response?.status || HttpStatus.BAD_REQUEST,
          error?.message,
        ),
      );
    }
  }
}
