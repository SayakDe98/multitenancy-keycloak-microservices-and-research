
import { Controller, Get, Post, Body, HttpCode, HttpStatus, Header, Req, Headers, Response, Param, Request } from "@nestjs/common";
import { AppService } from "./app.service";
import { LoginUserDto } from "./dto/admin/users/login-user.dto";
import { ApiBearerAuth, ApiHeader, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { SignupUserDto } from "./dto/admin/users/signup-user.dto";
import { SignupProviderUserDto } from "./dto/admin/users/signup-provider-user.dto";
import { CreateProviderGroupDto } from "./dto/admin/provider-group/create-provider-group.dto";
import { CreateRoleDto } from "./dto/admin/roles/create-role.dto";

@Controller()
@ApiSecurity('Authorization')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Admin')
  @Get('/api/v1/admin')
  communicateAdminService() {
    return this.appService.communicateAdminService();
  }

  @ApiTags('Provider')
  @Get('/api/v1/provider')
  communicateProviderService() {
    return this.appService.communicateProviderService();
  }

  @ApiTags('Admin')
  @Post('/api/v1/admin/users/login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(
    // @Headers() headers,
    @Body() tokenBody: LoginUserDto,
    @Response() res,
  ) {
    // const client_id = headers['x-tenant-id'];
    const grant_type = 'password';
    // const updatedBody = { ...tokenBody, client_id, grant_type };
    const updatedBody = { ...tokenBody, grant_type };
    const loginUser = await this.appService.login(updatedBody).toPromise();
    // if(loginUser?.statusCode !== HttpStatus.ACCEPTED)
    //   res.status(loginUser?.statusCode).send(loginUser);
    res
      .status(loginUser?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(loginUser);
  }

  @ApiTags('Admin')
  @Post('/api/v1/admin/users/logout/:userId')
  @HttpCode(HttpStatus.ACCEPTED)
  async logout(
    @Headers() headers,
    @Param() userId: string,
    @Response() res,
  ) {
   
    const token = headers['authorization'];

    const logoutUser = await this.appService.logout(userId, token).toPromise();
 
    res
      .status(logoutUser?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(logoutUser);
  }

  // @Post('/api/v1/admin/users/attach-user-to-provider-group')
  // @HttpCode(HttpStatus.CREATED)
  // async attachUserToCertainClient(
  //   @Headers() headers,
  //   @Body() body,
  //   @Response() res,
  // ) {
  //   const token = headers['Authorization'];
  //   const attachUserToClient = await this.appService
  //     .attachUserToCertainClient(body, token)
  //     .toPromise();
  //   res
  //     .status(
  //       attachUserToClient?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
  //     )
  //     .send(attachUserToClient);
  // }

  @ApiTags('Admin')
  @Post('/api/v1/admin/users/signup')
  @ApiHeader({ name: 'x-tenant-id' })
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Headers() headers,
    @Body() createUserDto: SignupUserDto,
    @Response() res,
  ) {
    const token = headers['authorization'];
    const clientName = headers['x-tenant-id'];
    const user = await this.appService
      .signupUser(createUserDto, token, clientName)
      .toPromise();
    res.status(user?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(user);
  }

  @ApiTags('Admin')
  @Post('/api/v1/admin/roles/client')
  @ApiHeader({ name: 'x-tenant-id' })
  @HttpCode(HttpStatus.CREATED)
  async createClientRole(
    @Headers() headers,
    @Body() createClientRoleDto: CreateRoleDto,
    @Response() res,
  ) {
    const token = headers['authorization'];
    const clientName = headers['x-tenant-id'];
    const role = await this.appService
      .createClientRole(createClientRoleDto, token, clientName)
      .toPromise();
    res.status(role?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(role);
  }

  @ApiTags('Admin')
  @Post('/api/v1/admin/users/signup-provider')
  @ApiHeader({ name: 'x-tenant-id' })
  @HttpCode(HttpStatus.CREATED)
  async createProviderUser(
    @Headers() headers,
    @Body() createUserDto: SignupProviderUserDto,
    @Response() res,
  ) {
    const token = headers['authorization'];
    const clientName = headers['x-tenant-id'];
    const user = await this.appService
      .signupProviderUser(createUserDto, token, clientName)
      .toPromise();
    res.status(user?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send(user);
  }

  @ApiTags('Admin')
  @Post('/api/v1/admin/provider-group')
  @HttpCode(HttpStatus.CREATED)
  async createProviderGroup(
    @Headers() headers,
    @Body() providerGroupBody: CreateProviderGroupDto,
    @Response() res,
  ) {
   
    const token = headers['authorization'];
    const newProviderGroup = await this.appService
      .createProviderGroup(providerGroupBody, token)
      .toPromise();
  
    res
      .status(newProviderGroup?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(newProviderGroup);
  }

  // @Post('/api/v1/admin/users/login')
  // @HttpCode(HttpStatus.CREATED)
  // loginUser(@Body() loginUserDto) {
  //   const user = this.appService.loginUser(loginUserDto);
  //   return user;
  // }

  // @Post('/api/v1/admin/users/validate')
  // @HttpCode(HttpStatus.CREATED)
  // validateUser(@Body() validateUserDto) {
  //   const user = this.appService.validateUser(validateUserDto);
  //   return user;
  // }

  @ApiTags('Admin')
  @Get('/api/v1/admin/provider-group/:name')
  @HttpCode(HttpStatus.OK)
  async getProviderGroupByName(
    @Headers() headers,
    @Param('name') name: string,
    @Response() res,
  ) {
    const token = headers['authorization'];
    const providerGroup = await this.appService
      .getProviderGroupByName(name, token)
      .toPromise();
    res
      .status(providerGroup?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(providerGroup);
  }

  @ApiTags('Admin')
  @Get('/api/v1/admin/roles/client/:roleName')
  @ApiHeader({ name: 'x-tenant-id' })
  @HttpCode(HttpStatus.OK)
  async getClientRole(
    @Headers() headers,
    @Param('roleName') roleName: string,
    @Response() res,
  ) {
    const token = headers['authorization'];
    const clientName = headers['x-tenant-id'];
    const providerGroup = await this.appService
      .getClientRole(roleName, token, clientName)
      .toPromise();
    res
      .status(providerGroup?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(providerGroup);
  }
}