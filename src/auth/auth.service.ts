import { Injectable } from '@nestjs/common';
import { UserService } from '../feature/user/user.service';

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
        const payload = {username:user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
