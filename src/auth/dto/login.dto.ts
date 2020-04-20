import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: '登录用户名'
    })
    username: string
    @ApiProperty({
        description: '登录密码'
    })
    password: string
}