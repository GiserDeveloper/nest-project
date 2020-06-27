import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../shared/entity/Project';
import { Repository } from 'typeorm';
import { ProjectDTO } from './dto/project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly ProjectRepo: Repository<Project>
    ){}

    //新增工程
    async addProject(data: ProjectDTO){
        const projectData = new Project();
        projectData.project_name = data.project_name;
        projectData.build_pattern = data.build_pattern;
        projectData.owner_company = data.owner_company;
        projectData.design_company = data.design_company;
        projectData.project_general = data.project_general;
        projectData.project_investment = data.project_investment;
        projectData.project_type = data.project_type;
        projectData.invest_scale = data.invest_scale;
        return await this.ProjectRepo.save(projectData);
    }
    
    //查找所有工程
    async getAllProjects(): Promise<Project []>{
        return await this.ProjectRepo.find();
    }

    //根据工程名称模糊查询
    async getProjectByName(name: string): Promise<Project []>{
        return await this.ProjectRepo.createQueryBuilder()
                         .where("project.project_name LIKE :param")
                         .setParameters({
                             param: '%' + name + '%'
                         })
                         .orderBy("project.id", "ASC")
                         .getMany();
    }

    //更新工程信息
    async updateProject(id, data: ProjectDTO){
        const newProjectData = new Project();
        newProjectData.project_name = data.project_name;
        newProjectData.build_pattern = data.build_pattern;
        newProjectData.owner_company = data.owner_company;
        newProjectData.design_company = data.design_company;
        newProjectData.project_general = data.project_general;
        newProjectData.project_investment = data.project_investment;
        newProjectData.project_type = data.project_type;
        newProjectData.invest_scale = data.invest_scale;
        return await this.ProjectRepo.update(id, newProjectData);
    }

    //删除工程信息
    async deleteProject(id){
        return await this.ProjectRepo.delete(id);
    }

    //根据ID查找工程
    async getProjectById(id){
        return await this.ProjectRepo.findOne(id);
    } 
}
