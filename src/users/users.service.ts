import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {UserDocument} from "./schemas/user.schema";
import {Model} from "mongoose";

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const mongoResp = await this.userModel.create(createUserDto)
      return `This action has added a new user: ${JSON.stringify(mongoResp)}`;
    }
    catch (e){
      console.error(e)
      throw e
    }
  }

  async findAll() {
    try {
      return this.userModel.find({})
    }
    catch (e){
      console.error(e)
      throw e
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
