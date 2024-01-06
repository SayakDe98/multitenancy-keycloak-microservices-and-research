import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, createConnection, getConnection, getConnectionManager, getManager } from 'typeorm';
import { ProviderGroupEntity } from 'src/entities/provider-group.entity';
import { CreateProviderGroupDto } from './dto/create-provider-group.dto';
import { dataSourceOptions } from 'db/data-source';
import { getProviderGroupConnection } from 'src/utils/provider-group.utilities';
import { ProviderGroupMapper } from './mappers/provider-group.mapper';
import { KeyCloakService } from 'src/keycloak/keycloakClient.service';

@Injectable()
export class ProviderGroupService {
    constructor(@InjectRepository(ProviderGroupEntity)
    private providerGroupRepository: Repository<ProviderGroupEntity>,
    private readonly providerGroupMapper: ProviderGroupMapper,
    private readonly keyCloakService: KeyCloakService,
    ) {}

    async createProviderGroup(createProviderGroup: CreateProviderGroupDto, token: string): Promise<ProviderGroupEntity> {
          const createdClientGroupId = await this.keyCloakService.createClinicGroup(
            createProviderGroup,
            token,
          );
        
          const providerGroupPayload = this.providerGroupMapper.createProviderGroupMapper(createdClientGroupId, createProviderGroup.rootUrl, createProviderGroup.clientId, createProviderGroup.description, createProviderGroup.baseUrl, createProviderGroup.alwaysDisplayInConsole);  
         
          const providerGroup = await this.providerGroupRepository.save(providerGroupPayload);  
          const schemaName = providerGroupPayload.name;
          let connectionDefault: DataSource;
           if (!getConnectionManager().has('default')) {
            connectionDefault = await createConnection(
                dataSourceOptions
            );
           } else {
             connectionDefault = getConnection();
           }
          await getManager().query(
            `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
          );

          const connection = await getProviderGroupConnection(schemaName);
          await connection.runMigrations();
          await connection.close();
          //we also need to assign a restricted-access role to this same client in keycloak
          const payload = {
            name: 'restricted-access',
            description: ''
          };
          await this.keyCloakService.createClientRole(payload, token, createdClientGroupId);
        return providerGroup;
    }

    async getProviderGroupByName (providerGroupName: string): Promise<ProviderGroupEntity> {
            const providerGroup = await this.providerGroupRepository.findOne({
                where: {
                    name: providerGroupName
                }
            })
            return providerGroup;
    }
}
