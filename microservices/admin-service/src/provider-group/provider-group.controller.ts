import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { of } from 'rxjs';
import { ProviderGroupService } from './provider-group.service';
import { ResponseMapper } from './mappers/response.mapper';
import { AuthInterceptor } from 'src/middleware/auth.middleware';

@Controller('provider-group')
export class ProviderGroupController {
  constructor(
    private readonly providerGroupService: ProviderGroupService,
    private readonly responseMapper: ResponseMapper,
  ) {}

  @MessagePattern({ cmd: 'create-provider-group' })
  async createProviderGroup(@Payload() createProviderGroupPayload) {
    try {
      const response = await this.providerGroupService.createProviderGroup(
        createProviderGroupPayload?.data,
        createProviderGroupPayload?.headers?.Authorization,
      );
      return of(
        this.responseMapper.successResponse(
          'Provider Group created successfully',
          HttpStatus.CREATED,
          response,
        ),
      );
    } catch (error) {
      return of(
        this.responseMapper.errorResponse(
          'Failed to add provider group',
          error?.response?.status || HttpStatus.BAD_REQUEST,
          error?.message,
        ),
      );
    }
  }

  @MessagePattern({ cmd: 'get-provider-group' })
  @UseInterceptors(AuthInterceptor)
  async getProviderGroup(@Payload() payload) {
    try {
      const response = await this.providerGroupService.getProviderGroupByName(
        payload?.data?.headers['x-tenant-id'],
      );
      return of(
        this.responseMapper.successResponse(
          'Provider Group fetched successfully',
          HttpStatus.OK,
          response,
        ),
      );
    } catch (error) {
      return of(
        this.responseMapper.errorResponse(
          'Failed to get provider group',
          HttpStatus.BAD_REQUEST,
          error?.message,
        ),
      );
    }
  }
}
