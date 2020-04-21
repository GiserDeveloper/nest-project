import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto/register.dto';

import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('登录注册模块')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('register')
    @ApiOperation({summary: '注册'})
    async register(@Body() dto: RegisterDTO){
        const { username, password, description } = dto;
        const user = await this.userService.addUser({
            username: username,
            password: password,
            description:description
        })
        return user;
    }

    @Post('login')
    @ApiOperation({summary: '登录'})
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @Req() req){
        return this.authService.login(req.user);
    }

    @Get('user')
    @ApiOperation({summary: '获取个人信息'})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async user(@Req() req){
        //根据用户ID返回用户信息
        return await this.userService.getUserById(req.user.userId);
    }

}
