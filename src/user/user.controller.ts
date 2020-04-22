import { Controller, Post, Body, UsePipes, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UserDTOValidationPipe } from '../shared/pipes/UserDTOValidationPipe'
import { ApiTags, ApiParam, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { AccessGuard } from '../shared/guards/access.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
@UseGuards(AccessGuard)
@ApiBearerAuth()
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
    async updateUserById(@Param('userId') id, @Body() userDTO: UserDTO){
        const result = await this.userService.updateUser(id, userDTO);
        let res = {msg: "修改成功！"};
        let newInfo = {};
        let user = {newUserInfo: newInfo};
        if(result.raw.changedRows == 1){
            //返回修改后的用户
            let updatedUser = await this.userService.getUserById(id);
            Object.assign(newInfo,updatedUser);
            return Object.assign(res,user);
        }else{
            return "修改失败！";
        }
    }
  
    @Delete(':userId')
    @ApiParam({
        name:'userId',
        description: '请传入用户ID'
    })
    @ApiOperation({summary: '删除指定ID的用户'})
    async delete(@Param('userId') id){
        const result = await this.userService.deleteUser(id);
        if(result.raw.affectedRows == 1){
            return "删除指定用户成功！";
        }else{
            return "删除指定用户失败！";
        }
    }

    @Get()
    @ApiOperation({summary: '获取所有用户'})
    getUserList(){
        return this.userService.getUsers();
    }

}
