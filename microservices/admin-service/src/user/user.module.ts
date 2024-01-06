import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { ProviderGroupEntity } from 'src/entities/provider-group.entity';
import { ProviderGroupService } from 'src/provider-group/provider-group.service';
import { TenancyModule } from 'src/tenancy/tenancy.module';
import { RoleService } from 'src/role/role.service';
import { RoleEntity } from 'src/entities/role.entity';
import { ResponseMapper } from 'src/provider-group/mappers/response.mapper';
import { ProviderGroupMapper } from 'src/provider-group/mappers/provider-group.mapper';
import { UserMapper } from 'src/provider-group/mappers/user.mapper';
import { KeyCloakService } from 'src/keycloak/keycloakClient.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ProviderGroupService, RoleService, ResponseMapper, UserMapper, ProviderGroupMapper, KeyCloakService],
  imports: [TenancyModule, TypeOrmModule.forFeature([UserEntity, ProviderGroupEntity, RoleEntity])],
})
export class UserModule {}
