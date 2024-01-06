import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { TenancyModule } from "src/tenancy/tenancy.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities/role.entity";
import { ProviderGroupEntity } from "src/entities/provider-group.entity";
import { RoleService } from "./role.service";
import { ProviderGroupService } from "src/provider-group/provider-group.service";
import { ProviderGroupMapper } from "src/provider-group/mappers/provider-group.mapper";
import { ResponseMapper } from "src/provider-group/mappers/response.mapper";
import { KeyCloakService } from "src/keycloak/keycloakClient.service";

@Module({
  controllers: [RoleController],
  providers: [RoleService, ProviderGroupService, ProviderGroupMapper, ResponseMapper, KeyCloakService],
  imports: [
    TenancyModule,
    TypeOrmModule.forFeature([RoleEntity, ProviderGroupEntity]),
  ],
})
export class RoleModule {}
