import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('PROVIDER_SERVICE')
    private readonly clientProviderService: ClientProxy,
    @Inject('ADMIN_SERVICE') private readonly clientAdminService: ClientProxy,
  ) {}

  communicateAdminService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientAdminService
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  communicateProviderService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientProviderService
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  login(userCreds) {
    const payload = { data: userCreds };
    const pattern = { cmd: 'login-user' };
    return this.clientAdminService.send(pattern, payload);
  }

  logout(userId: string, token: string) {
    const payload = { data: userId, headers: {
      Authorization: token
    } };
    const pattern = { cmd: 'logout-user' };
    return this.clientAdminService.send(pattern, payload);
  }

  // attachUserToCertainClient(rolePayload, token: string) {
  //   const payload = { data: rolePayload, token };
  //   const pattern = { cmd: 'attach-user-to-certain-client' };
  //   return this.clientAdminService.send(pattern, payload);
  // }

  signupUser(newUser, token: string, clientName: string) {
    const payload = {
      data: newUser,
      headers: { Authorization: token, 'x-tenant-id': clientName },
    };
    const pattern = { cmd: 'signup-user' };
    return this.clientAdminService.send(pattern, payload);
  }

  signupProviderUser(newUser, token: string, clientName: string) {
    const payload = {
      data: newUser,
      headers: { Authorization: token, 'x-tenant-id': clientName },
    };
    const pattern = { cmd: 'signup-provider-user' };
    return this.clientAdminService.send(pattern, payload);
  }

  loginUser(user) {
    const payload = user;
    const pattern = { cmd: 'login-user' };
    return this.clientAdminService.send(pattern, payload);
  }

  createProviderGroup(providerGroup, token: string) {
    const payload = { data: providerGroup, headers: { Authorization: token } };
    const pattern = { cmd: 'create-provider-group' };
    return this.clientAdminService.send(pattern, payload);
  }

  getProviderGroupByName(name: string, token: string) {
    const payload = { headers: { Authorization: token, 'x-tenant-id': name } };
    const pattern = { cmd: 'get-provider-group' };
    return this.clientAdminService.send(pattern, payload);
  }

  createClientRole(newClientRole, token: string, clientName: string) {
    const payload = {
      data: newClientRole,
      headers: { Authorization: token, 'x-tenant-id': clientName },
    };
    const pattern = { cmd: 'create-client-role' };
    return this.clientAdminService.send(pattern, payload);
  }

  getClientRole(roleName: string, token: string, clientName: string) {
    const payload = {
      data: { name: roleName },
      headers: { Authorization: token, 'x-tenant-id': clientName },
    };
    const pattern = { cmd: 'get-client-role' };
    return this.clientAdminService.send(pattern, payload);
  }
  // validateUser(userCreds) {
  //   const payload = userCreds;
  //   const pattern = { cmd: 'validate-user' };
  //   return this.clientAdminService.send(pattern, payload);
  // }
}
