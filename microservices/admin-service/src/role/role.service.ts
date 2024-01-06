import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { KeyCloakService } from 'src/keycloak/keycloakClient.service';
import { ProviderGroupService } from 'src/provider-group/provider-group.service';
import { CONNECTION } from 'src/tenancy/tenancy.symbols';
import { CreateRoleDto } from 'src/user/dto/create-role.dto';
import { getProviderGroupConnection } from 'src/utils/provider-group.utilities';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private readonly providerGroupService: ProviderGroupService,
    private readonly keyCloakService: KeyCloakService,

    @Inject(CONNECTION) connection: Connection,
  ) {
    this.roleRepository = connection.getRepository(RoleEntity);
  }
  async createNewClientRole(
    clientRole: CreateRoleDto,
    token: string,
    clientName: string,
  ): Promise<RoleEntity> {
    // try {
      //create a new role in keycloak
      const client = await this.providerGroupService.getProviderGroupByName(
        clientName,
      );
      if (!client) {
        throw new HttpException(
          'Provider Group does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const createdRole = await this.keyCloakService.createClientRole(
        clientRole,
        token,
        client?.clinicId,
      );
      //create the same role in local db
      const getClientRoles = await this.keyCloakService.getAllClientRoles(
        client?.clinicId,
        token,
      );
      const getCurrentRoleUuid = getClientRoles?.data?.find(
        (role) => role.name === clientRole.name,
      )?.id;
      if (!getCurrentRoleUuid) {
        throw new HttpException(
          'Failed to get current role',
          HttpStatus.BAD_REQUEST,
        );
      }
      const clientRolePayload = {
        ...clientRole,
        uuid: getCurrentRoleUuid,
      };
      const role = await this.roleRepository.save(clientRolePayload);
      // return {
      //   message: 'Role created successfully',
      //   statusCode: HttpStatus.CREATED,
      //   data: role,
      // };
    // } catch (error) {
    //   console.log(error);
    //   return {
    //     message: 'Failed to create role',
    //     statusCode: error?.response?.status || HttpStatus.BAD_REQUEST,
    //     error: error?.message,
    //   };
    // }
    return role;
  }

  async getClientRole (clientName: string, name: string): Promise<RoleEntity>{
    // try {
      const clientConnection = await getProviderGroupConnection(clientName)
        const clientRole = await clientConnection?.getRepository(RoleEntity)
        .findOne({ where: {
          name//role name
        }});
        if(!clientRole) {
          throw new HttpException('Client Role not found', HttpStatus.BAD_REQUEST)
        }
    return clientRole;
  }
}
