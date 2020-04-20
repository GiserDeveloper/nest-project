import { IsString, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {

    // @IsNumber()
    // @ApiProperty({
    //     description: '用户ID(不能为0)'
    // })
    // id: number;

    @IsString()
    @ApiProperty({
        description: '用户名'
    })
    username: string;

    @MaxLength(15)
    @ApiProperty({
        description: '用户密码(长度小于15位)'
    })
    password: string;

    @ApiProperty({
        description: '用户描述'
    })
    description: string;
}