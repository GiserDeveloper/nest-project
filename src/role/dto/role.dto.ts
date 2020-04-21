import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        description: '角色'
    })
    roleName: string;
}