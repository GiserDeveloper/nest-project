import { Controller, Post, Body, UsePipes, Get, Put, Delete, Param } from '@nestjs/common';
import { UserDTO } from './userDTO';
import { UserService } from './user.service';
import { UserDTOValidationPipe } from '../../shared/pipes/UserDTOValidationPipe'
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
@UsePipes(UserDTOValidationPipe)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({summary: '创建新用户'})
    create(@Body() userDTO: UserDTO){
        return this.userService.addUser(userDTO);
    }

    @Get(':userId')
    @ApiParam({
        name:'userId',
        description: '请传入用户ID'
    })
    @ApiOperation({summary: '根据用户ID查找用户'})
    getUserById(@Param('userId') id){
        return this.userService.getUserById(id);
    }
  
    @Put(':userId')
    @ApiParam({
        name:'userId',
        description: '请传入用户ID'
    })
    @ApiOperation({summary: '传入用户ID修改用户'})
    updateUserById(@Param('userId') id, @Body() userDTO: UserDTO){
        return this.userService.updateUser(id, userDTO);
    }
  
    @Delete(':userId')
    @ApiParam({
        name:'userId',
        description: '请传入用户ID'
    })
    @ApiOperation({summary: '删除指定ID的用户'})
    delete(@Param('userId') id){
        return this.userService.deleteUser(id);
    }

    @Get()
    @ApiOperation({summary: '获取所有用户'})
    getUserList(){
        return this.userService.getUsers();
    }

}