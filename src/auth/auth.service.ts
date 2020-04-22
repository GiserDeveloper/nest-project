import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username:string, password:string){
        const user = await this.userService.findUserByUsername(username);
        return user;
    }

    async login(user:any){
        //查询用户角色
        const userRole = (await this.userService.findUserByUsername(user.username)).roleId;
        //生成签名
        const payload = {username:user.username, userId: user.id, roleId: userRole};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
