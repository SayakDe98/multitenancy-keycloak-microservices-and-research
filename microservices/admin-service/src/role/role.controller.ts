import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { of } from 'rxjs';
import { RoleService } from './role.service';
import { ResponseMapper } from 'src/provider-group/mappers/response.mapper';
import { AuthInterceptor } from 'src/middleware/auth.middleware';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly responseMapper: ResponseMapper,
  ) {}

  @MessagePattern({ cmd: 'create-client-role' })
  async createClientRole(@Payload() payload) {
    const token = payload?.headers?.Authorization;
    const clientName = payload?.headers['x-tenant-id'];
    delete payload?.headers['x-tenant-id'];
    try {
      const response = await this.roleService.createNewClientRole(
        payload?.data,
        token,
        clientName,
      );
      return of(
        this.responseMapper.successResponse(
          'Role found successfully',
          HttpStatus.OK,
          response,
        ),
      );
    } catch (error) {
      return of(
        this.responseMapper.errorResponse(
          'Failed to retrieve roles',
          error?.response?.status || HttpStatus.BAD_REQUEST,
          error?.message,
        ),
      );
    }
  }

  @MessagePattern({ cmd: 'get-client-role' })
  @UseInterceptors(AuthInterceptor)
  async getClientRole(@Payload() payload) {
    try {
      const clientName = payload?.headers['x-tenant-id'];
      const response = await this.roleService.getClientRole(
        clientName,
        payload?.data?.name,
      );
      return of(this.responseMapper.successResponse('Role found successfully', HttpStatus.OK, response));
    } catch (error) {
      return of(this.responseMapper.errorResponse('Failed to retrieve roles', HttpStatus.BAD_REQUEST, error?.message));
    }
  }
}