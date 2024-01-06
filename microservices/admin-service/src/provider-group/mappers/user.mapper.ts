import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserMapper {
  public signupMapper(
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    mobileNo: string,
    userRoles: any,
    iamId: string,
    username: string,
  ): UserEntity {
    return Builder(UserEntity)
      .firstName(firstName)
      .lastName(lastName)
      .email(email)
      .address(address)
      .mobileNo(mobileNo)
      .iamId(iamId)
      .username(username)
      .roles(userRoles)
      .build();
  }

}
