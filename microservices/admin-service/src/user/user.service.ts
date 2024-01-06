import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  Repository,
  createConnection,
  getConnection,
  getConnectionManager,
} from 'typeorm';
import { Response } from 'express';
import { ProviderGroupService } from 'src/provider-group/provider-group.service';
import { dataSourceOptions } from 'db/data-source';
import { getProviderGroupConnection } from 'src/utils/provider-group.utilities';
import { CONNECTION } from 'src/tenancy/tenancy.symbols';
import { RoleService } from 'src/role/role.service';
import { UserMapper } from 'src/provider-group/mappers/user.mapper';
import { LoginOutputModel } from 'src/models/login-output.model';
import { LoginInputModel } from 'src/models/login-input.model';
import { KeyCloakService } from 'src/keycloak/keycloakClient.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
    private readonly providerGroupService: ProviderGroupService,
    private readonly userMapper: UserMapper,
    private readonly keyCloakService: KeyCloakService,

    @Inject(CONNECTION) connection: Connection,
  ) {
    this.userRepository = connection.getRepository(UserEntity);
  }
  getHello(): string {
    return 'Hello  from Admin Service!';
  }
  async login(payload: LoginInputModel): Promise<LoginOutputModel> {
    // payload = { ...payload, headers: {
    //   'x-tenant-id': payload?.data?.client_id
    // }}
      const loginUser = await this.keyCloakService.getKeyCloakToken(payload);
      return loginUser;
  }

  async logout(userId: string, token: string): Promise<any> {
    const logoutUser = await this.keyCloakService.logout(userId, token);
    return logoutUser;
  }

  async createAdminUser(
    //used to create a new super admin user and this user goes to public schema
    signupUser: SignupUserDto,
    password: string,
    token: string | undefined
  ): Promise<UserEntity> {
    // try {
      if (!token)
        throw new HttpException(
          'Please provide a token', HttpStatus.BAD_REQUEST);
      const createdKeyCloakUserIamId = await this.keyCloakService.createKeyCloakAdminUser(
        { ...signupUser, password },
        token,
      );
      if (!createdKeyCloakUserIamId)
        throw new HttpException(
          'Please provide an iam id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      const adminRealmRole = await this.keyCloakService.getAdminRealmRole(token);
      let clientRoles = []
      clientRoles.push(
            { roleUuid: adminRealmRole?.id }
           )
      const localUserPayload = {
        ...signupUser,
        iamId: createdKeyCloakUserIamId,
        roles: clientRoles,
      };
    

   
      const createLocalUser = await this.userRepository.save(localUserPayload);
      return createLocalUser;
  
  }

  async createProviderUser(
    signupUser: SignupUserDto,
    password: string | undefined,
    token: string | undefined,
    clientName: string | undefined,
  ): Promise<UserEntity> {
      // connect to connection of provider group schema, use logic of nestjs multitenancy
      if (!token)
        throw new HttpException(
          'Please provide a token',
          HttpStatus.BAD_REQUEST,
        );
      if (!password) {
        password = '';
      }
      const createdKeyCloakUserIamId = await this.keyCloakService.createKeyCloakUser(
        { ...signupUser, password },
        token,
      );
      if (!createdKeyCloakUserIamId)
        throw new HttpException(
          'Please provide an iam id',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
     
      const getClientName =
        await this.providerGroupService.getProviderGroupByName(clientName);
      if (!getClientName) {
        throw new HttpException('Failed to fetch client', HttpStatus
        .BAD_REQUEST);
      }
      const client = getClientName?.clinicId;
      const findAvailableRestrictedRole =
        await this.keyCloakService.getAllRestrictedAccessClientRolesForUser(
          createdKeyCloakUserIamId,
          token,
        );

      const availableRoles = findAvailableRestrictedRole?.data;
      const restrictedRoleIndex = availableRoles?.findIndex(
        (role) => role?.client === clientName,
      );
      if (restrictedRoleIndex === -1) {
        throw new HttpException('Failed to fetch role', HttpStatus.BAD_REQUEST);
      }
      const attachUserToClientPayload = {
        userId: createdKeyCloakUserIamId,
        clientId: client,
        roleId: availableRoles[restrictedRoleIndex]?.id,
      };
      
      await this.keyCloakService.attachRestrictedAccessRoleToUser(attachUserToClientPayload, token);
      let clientRoles = [];
      if(signupUser?.roles && signupUser?.roles.length > 0) {
        for (let role = 0; role < signupUser.roles.length; role++) {
          const currentClientRole = await this.roleService.getClientRole(
            clientName,
            signupUser.roles[role],
            // token
          ); //get the client roles store them and assign to user.roles
          const attachRoleToClientPayload = {
            userId: createdKeyCloakUserIamId,
            clientId: client,
            // roleId: signupUser.roles[role],
            roleId: currentClientRole?.uuid,
            roleName: currentClientRole?.name,
            roleDescription: currentClientRole?.description,
          };
          await this.keyCloakService.attachProviderRoleToUser(attachRoleToClientPayload, token);

          clientRoles.push({ roleUuid: currentClientRole?.uuid  });
        }
      
      }
     
      const user: UserEntity = this.userMapper.signupMapper(signupUser.firstName, signupUser.lastName, signupUser.email, signupUser.address, signupUser.mobileNo, clientRoles, createdKeyCloakUserIamId, signupUser.username);
      const savedUser = await this.userRepository.save(user);
    return savedUser
  }

  // async attachUserToCertainClient(attachUserToCertainClient, token: string) {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //     return {
  //       message: 'Failed to attach client to user',
  //       statusCode: error?.response?.status || HttpStatus.BAD_REQUEST,
  //       error: error?.message,
  //     };
  //   }
  // }

  
}
