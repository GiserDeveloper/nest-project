import { Controller, Post, Body, UsePipes, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ProjectDTO } from './dto/project.dto';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiParam, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { AccessGuard } from '../shared/guards/access.guard';

@ApiTags('基建项目')
@Controller('projects')
@UseGuards(AccessGuard)
@ApiBearerAuth()
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}

    @Post()
    @ApiOperation({summary: '创建新项目'})
    create(@Body() project: ProjectDTO){
        return this.projectService.addProject(project);
    }

    @Get()
    @ApiOperation({summary: '获取所有项目'})
    getProjectList(){
        return this.projectService.getAllProjects();
    }

    @Get(':projectName')
    @ApiParam({
        name: 'projectName',
        description: '请传入工程名称'
    })
    @ApiOperation({summary: '根据工程名称查找工程'})
    getProjectByName(@Param('projectName') projectName){
        return this.projectService.getProjectByName(projectName);
    }

    @Put(':projectId')
    @ApiParam({
        name:'projectId',
        description: '请传入工程ID'
    })
    @ApiOperation({summary: '传入工程ID修改工程'})
    async updateProjectById(@Param('projectId') id, @Body() newProject: ProjectDTO){
        const result = await this.projectService.updateProject(id, newProject);
        let res = {msg: "修改成功！"};
        let newInfo = {};
        let project = {newProjectInfo: newInfo};
        if(result.raw.changedRows == 1){
            //返回修改后的工程
            let updatedProject = await this.projectService.getProjectById(id);
            Object.assign(newInfo,updatedProject);
            return Object.assign(res,project);
        }else{
            return "修改失败！";
        }
    }

    @Delete(':projectId')
    @ApiParam({
        name:'projectId',
        description: '请传入工程ID'
    })
    @ApiOperation({summary: '根据工程ID删除工程'})
    async deleteProject(@Param('projectId') id){
        const result = await this.projectService.deleteProject(id);
        if(result.raw.affectedRows == 1){
            return "删除指定工程成功！";
        }else{
            return "删除指定工程失败！";
        }
    }
}
