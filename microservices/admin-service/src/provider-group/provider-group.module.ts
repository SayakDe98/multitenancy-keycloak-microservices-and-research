import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderGroupService } from './provider-group.service';
import { ProviderGroupController } from './provider-group.controller';
import { ProviderGroupEntity } from 'src/entities/provider-group.entity';
import { ProviderGroupMapper } from './mappers/provider-group.mapper';
import { ResponseMapper } from './mappers/response.mapper';
import { KeyCloakService } from 'src/keycloak/keycloakClient.service';

@Module({
  providers: [ProviderGroupService, ProviderGroupMapper, ResponseMapper, KeyCloakService],
  controllers: [ProviderGroupController],
  imports: [TypeOrmModule.forFeature([ProviderGroupEntity])]
})
export class ProviderGroupModule {}
