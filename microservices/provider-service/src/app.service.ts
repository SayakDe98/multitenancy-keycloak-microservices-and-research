import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/property.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './schema/property.schema';
import { User } from '../../service-a/src/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<Property>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  getHello(): string {
    return 'Hello  from service b!';
  }

  async create(propertyDto: CreatePropertyDto) {
    try {
      const ownerExists = await this.userModel.findOne({ username: propertyDto.owner});
      if (!ownerExists) {
        throw new Error('Owner not found');
      }
      const createdProperty = new this.propertyModel(propertyDto);
      await createdProperty.save();
      return {
        property: createdProperty.property,
        owner: createdProperty.owner,
        cost: createdProperty.cost
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      return await this.propertyModel.find().select('-_id -__v');
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
