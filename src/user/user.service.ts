import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../shared/entity/User';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { hashSync } from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepo: Repository<User>,
    ){}
    
    //新增用户
    async addUser(data: UserDTO){
      const userData = new User();
      //userData.id = data.id;
      userData.username = data.username;
      if(data.password){
        userData.password = hashSync(data.password);
      }
      userData.description = data.description;
      return await this.UserRepo.save(userData);
    }

    //查找所有用户
    async getUsers(): Promise<User []>{
      return await this.UserRepo.find();
    }

    //根据ID查找用户
    async getUserById(id): Promise<User>{
      return await this.UserRepo.findOne(id);
    }

    //更新用户信息
    async updateUser(id, data: UserDTO){
      const newUserData = new User();
      //userData.id = data.id;
      newUserData.username = data.username;
      if(data.password){
        newUserData.password = hashSync(data.password);
      }
      newUserData.description = data.description;
      return await this.UserRepo.update(id,newUserData);
    }

    //删除用户信息
    async deleteUser(id){
      return await this.UserRepo.delete(id);
    }

    //用于验证的方法,根据用户名查找用户
    async findUserByUsername(username:string): Promise<User | undefined> {
      return await this.UserRepo.findOne({username: username});
    }
}
