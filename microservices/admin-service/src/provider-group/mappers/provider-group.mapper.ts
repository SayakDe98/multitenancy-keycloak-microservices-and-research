import { Injectable } from "@nestjs/common";
import { Builder } from "builder-pattern";
import { ProviderGroupEntity } from "src/entities/provider-group.entity";

@Injectable()
export class ProviderGroupMapper {
    public createProviderGroupMapper (clinicId: string, rootUrl: string, name: string, description: string, baseUrl: string, alwaysDisplayInConsole: boolean): ProviderGroupEntity {
        return Builder(ProviderGroupEntity).clinicId(clinicId).rootUrl(rootUrl).name(name).description(description).baseUrl(baseUrl).alwaysDisplayInConsole(alwaysDisplayInConsole).build();
    }
}