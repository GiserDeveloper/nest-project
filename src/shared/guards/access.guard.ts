import { Injectable, CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decode, sign, verify } from 'jsonwebtoken';
import { jwtConstants } from '../../auth/constants';

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext):boolean {
        //验证逻辑
        const request = context.switchToHttp().getRequest();
        const ctrl = context.getClass();
        //利用reflect metadata取得存取资源对应得方法
        const handler = context.getHandler();
        //取得header里的token信息
        let token = request.headers['authorization'].replace(/\s*/g,"").substr(6);
        //验证token是否过期等
        if(verify(token,jwtConstants.secret))
        {
            let userInfo = JSON.parse(JSON.stringify(decode(token)));
            //如果角色信息为admin则返回true
            if(userInfo.roleId){
                if(userInfo.roleId == 1){
                    return true;
                }else{
                    return false
                }
            }else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}
