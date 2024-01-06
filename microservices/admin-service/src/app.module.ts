import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProviderGroupModule } from './provider-group/provider-group.module';
import { dataSourceOptions } from 'db/data-source';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ProviderGroupModule,
    RoleModule
  ],
  providers: [AppService],
})
export class AppModule {}
