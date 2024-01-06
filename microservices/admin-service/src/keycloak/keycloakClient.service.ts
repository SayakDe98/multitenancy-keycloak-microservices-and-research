import { HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";
import { attachProviderRoleModel } from "src/models/attach-provider-role.model";
import { AttachRestrictedAccessRoleModel } from "src/models/attach-restricted-role.model";
import { CreateAdminPortalRoleModel } from "src/models/create-admin-portal-role.model";
import { CreateClinicGroupModel } from "src/models/create-clinic-group.model";
import { LoginInputModel } from "src/models/login-input.model";
import { LoginOutputModel } from "src/models/login-output.model";
import { CreateRoleDto } from "src/user/dto/create-role.dto";
import { SignupUserDto } from "src/user/dto/signup-user.dto";
const qs = require('qs');

@Injectable()
export class KeyCloakService {
  createKeyCloakAdminUser = async (
    newUser: SignupUserDto & { password: string },
    token: string,
  ) => {
    // try {
    // delete newUser?.address;
    // delete newUser?.mobileNo;
    // delete newUser?.roles;
    // delete newUser?.password;
    const createKeyCloakUserPayload = {
      username: newUser?.username,
      email: newUser?.email,
      firstName: newUser?.firstName,
      lastName: newUser?.lastName,
      enabled: true,
      emailVerified: '',
      groups: ['ADMIN_USER'],
      attributes: {},
      credentials: [
        { type: 'password', temporary: false, value: newUser?.password },
      ],
    };
    const user = await axios.post(
      'http://localhost:8080/auth/admin/realms/master/users',
      createKeyCloakUserPayload,
      {
        headers: {
          Authorization: token,
        },
      },
    );
   
    if (
      user?.headers?.location &&
      user?.headers?.location.match(/\/users\/([\w-]+)/)?.length > 0
    )
      return user?.headers?.location.match(/\/users\/([\w-]+)/)[1];
  
  };

  createKeyCloakUser = async (
    newUser: SignupUserDto & { password: string },
    token: string,
  ) => {
  
    const createKeyCloakUserPayload = {
      username: newUser?.username,
      email: newUser?.email,
      firstName: newUser?.firstName,
      lastName: newUser?.lastName,
      enabled: true,
      emailVerified: '',
      groups: [],
      attributes: {},
      credentials: [
        { type: 'password', temporary: false, value: newUser?.password },
      ],
    };
    const user = await axios.post(
      'http://localhost:8080/auth/admin/realms/provider/users',
      createKeyCloakUserPayload,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    
    if (
      user?.headers?.location &&
      user?.headers?.location.match(/\/users\/([\w-]+)/)?.length > 0
    )
      return user?.headers?.location.match(/\/users\/([\w-]+)/)[1];
  
  };

  resetPassword = async (
    keyCloakIamId: string,
    newPassword: string,
    token: string,
  ) => {
    // try {
    if (!keyCloakIamId) throw new Error('Please provide an iam id');
    const resetPasswordPayload = {
      type: 'password',
      temporary: false,
      value: newPassword,
    };

    const resetPassword = await axios.put(
      `http://localhost:8080/auth/admin/realms/provider/users/${keyCloakIamId}/reset-password`,
      resetPasswordPayload,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return resetPassword;
   
  };

  // export const getKeyCloakToken = async (payload: LoginInputModel): Promise<LoginOutputModel> => {//Provider portal login
  //   // try {
  //        const data = qs.stringify({
  //     'username': payload?.username,
  //     'password': payload?.password,
  //     'client_id': payload?.client_id,
  //     'grant_type': payload?.grant_type
  //   });
  //     const res: any = await axios.post(
  //       'http://localhost:8080/auth/realms/provider/protocol/openid-connect/token', data,
  //       {
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded'
  //         }
  //       }
  //     );
  //     return res?.data;
  //   // } catch (error) {
  //     // console.log(error);
  //     // throw new Error(error);
  //   // }
  // }

  getKeyCloakToken = async (
    payload: LoginInputModel,
  ): Promise<LoginOutputModel> => {
    // try {
    const data = qs.stringify({
      username: payload?.username,
      password: payload?.password,
      client_id: 'admin-cli',
      client_secret: process.env.KEYCLOAK_ADMIN_CLI_CLIENT_SECRET,
      grant_type: 'password',
    });
    const res: any = await axios.post(
      'http://localhost:8080/auth/realms/master/protocol/openid-connect/token',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return res?.data;
    
  };
  // export const attachRole = async (payload, token) => {
  //   try {
  //     const res = await axios.post(`http://localhost:8090/auth/admin/realms/master/users/${payload?.userId}/role-mappings/clients/${payload?.clientContainerId}`,
  //       [{
  //         id: payload?.clientUuid,
  //         composite: payload?.composite,
  //         containerId: payload?.clientContainerId,
  //         name: payload?.clientName,
  //         clientRole: payload?.clientRole
  //       }], {
  //       headers: {
  //         Authorization: token
  //       }
  //     });
  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // }

  // export const attachRole = async (payload, token) => {
  //   // try {
  //     const res = await axios.post(
  //       `http://localhost:8080/auth/admin/realms/master/users/${payload?.userId}/role-mappings/clients/${payload?.clientId}`,
  //       [
  //         {
  //           id: payload?.clientRoleId,
  //           name: payload?.clientRoleName,
  //         },
  //       ],
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       },
  //     );
  //     return res;
  //   // } catch (error) {
  //     // console.log(error);
  //     // throw new Error(error);
  //   // }
  // };

  createClinicGroup = async (
    payload: CreateClinicGroupModel,
    token: string,
  ) => {
  
    const updatedPayload = {
      protocol: 'openid-connect',
      clientId: payload?.clientId,
      name: payload?.name,
      description: payload?.description,
      publicClient: true,
      authorizationServicesEnabled: false,
      serviceAccountsEnabled: false,
      implicitFlowEnabled: false,
      directAccessGrantsEnabled: true,
      standardFlowEnabled: true,
      frontchannelLogout: true,
      attributes: {
        saml_idp_initiated_sso_url_name: '',
        'oauth2.device.authorization.grant.enabled': false,
        'oidc.ciba.grant.enabled': false,
      },
      alwaysDisplayInConsole: payload?.alwaysDisplayInConsole,
      rootUrl: payload?.rootUrl,
      baseUrl: payload?.baseUrl,
    };
    const res = await axios.post(
      'http://localhost:8080/auth/admin/realms/provider/clients',
      updatedPayload,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    if (
      res?.headers?.location &&
      res?.headers?.location?.split('/').length === 9
    ) {
      return res?.headers?.location?.split('/')[8];
    } else {
      throw new Error('Unable to extract client id');
    }
  };

  createClientRole = async (
    payload: CreateRoleDto,
    token: string,
    clientUuid: string,
  ) => {
    const res = await axios.post(
      `http://localhost:8080/auth/admin/realms/provider/clients/${clientUuid}/roles`,
      {
        name: payload?.name,
        description: '',
        attributes: {},
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res;
  };

  getAllClientRoles = async (clientUuid: string, token: string) => {
    const res = await axios.get(
      `http://localhost:8080/auth/admin/realms/provider/clients/${clientUuid}/roles`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res;
  };

  getAdminRealmRole = async (token: string) => {
    const res = await axios.get(
      'http://localhost:8080/auth/admin/realms/master/roles?search=admin',
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res?.data[0];
  };

  getAllRestrictedAccessClientRolesForUser = async (
    userId: string,
    token: string,
  ) => {
    const res = await axios.get(
      `http://localhost:8080/auth/admin/realms/provider/ui-ext/available-roles/users/${userId}?first=0&max=1000&search=restricted-access`,
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res;
  };

  attachRestrictedAccessRoleToUser = async (
    payload: AttachRestrictedAccessRoleModel,
    token: string,
  ) => {
    const res = await axios.post(
      `http://localhost:8080/auth/admin/realms/provider/users/${payload?.userId}/role-mappings/clients/${payload?.clientId}`,
      [
        {
          id: payload?.roleId,
          name: 'restricted-access',
          description: '',
        },
      ],
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res;
  };

  attachProviderRoleToUser = async (
    payload: attachProviderRoleModel,
    token: string,
  ) => {
    const res = await axios.post(
      `http://localhost:8080/auth/admin/realms/provider/users/${payload?.userId}/role-mappings/clients/${payload?.clientId}`,
      [
        {
          id: payload?.roleId,
          name: payload?.roleName,
          description: payload?.roleDescription,
        },
      ],
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res;
  };

  createAdminPortalRole = async (
    payload: CreateAdminPortalRoleModel,
    token: string,
  ) => {
    const res = await axios.post(
      'http://localhost:8080/auth/admin/realms/master/roles',
      {
        attributes: payload?.attributes,
        description: payload?.description,
        name: payload?.name,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return res; //create controller and service in role and api gateway
  };

  verifyAdminAccessToken = async (token: string) => {
    const data = qs.stringify({
      client_id: 'admin-cli',
      client_secret: process.env.KEYCLOAK_ADMIN_CLI_CLIENT_SECRET,
      token,
    });
    const res = await axios.post(
      'http://localhost:8080/auth/realms/master/protocol/openid-connect/token/introspect',
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return res;
  };

  logout = async (userId: string, token: string) => {
    const res = await axios.post(`http://localhost:8080/auth/admin/realms/master/users/${userId}/logout`, null, {
      headers: {
        Authorization: token
      }
    })
    return res?.data;
  }
}
