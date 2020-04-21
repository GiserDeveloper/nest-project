import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Body, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './dto/role.dto';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';

@ApiTags('角色')
@Controller()
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) {}

    @Post('role')
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOperation({summary: '新增角色'})
    addRole(@Body() roleDTO: RoleDTO){
        return this.roleService.addRole(roleDTO);
    }

    @Get('role/list')
    @ApiOperation({summary: '获取所有角色信息'})
    getRoles(){
        return this.roleService.getRoles();
    }

    @Get('role/:roleId')
    @ApiParam({
        name:'roleId',
        description: '请传入角色ID'
    })
    @ApiOperation({summary: '根据角色ID查找角色'})
    getRoleById(@Param('roleId') id){
        return this.roleService.getRoleById(id);
    }

    @Delete('role/:roleId')
    @ApiParam({
        name:'roleId',
        description: '请传入角色ID'
    })
    @ApiOperation({summary: '根据角色ID删除角色'})
    deleteRole(@Param('roleId') id){
        return this.roleService.deleteRoleById(id);
    }

    @Put('role/:roleId')
    @ApiParam({
        name:'roleId',
        description: '请传入角色ID'
    })
    @ApiOperation({summary: '传入角色ID修改角色'})
    updateRole(@Param('roleId') id, @Body() roleDto: RoleDTO){
        return this.roleService.updateRoleById(id, roleDto);
    }
}
