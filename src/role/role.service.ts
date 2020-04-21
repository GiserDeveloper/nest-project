import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../shared/entity/Role';
import { RoleDTO } from './dto/role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>
    ){}

    async addRole(roleDto: RoleDTO){
        const role = new Role();
        role.roleName = roleDto.roleName;
        return await this.roleRepo.save(role);
    }

    async getRoleById(id){
        return await this.roleRepo.findOne(id);
    }

    async getRoles(){
        return await this.roleRepo.find({relations: ['users']}); // 载入关联属性
    }

    async deleteRoleById(id){
        return await this.roleRepo.delete(id);
    }

    async updateRoleById(id,data:RoleDTO){
        const newRoleData = new Role();
        newRoleData.roleName = data.roleName;
        return await this.roleRepo.update(id,newRoleData);
    }
}
