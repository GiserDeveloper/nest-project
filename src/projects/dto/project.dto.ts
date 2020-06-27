import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectType, InvestmentScale } from '../../shared/entity/Project';

export class ProjectDTO{
    @IsString()
    @ApiProperty({
        description: '项目名称'
    })
    project_name: string;

    @ApiProperty({
        description: '建设模式'
    })
    build_pattern: string;

    @ApiProperty({
        description: '业主单位'
    })
    owner_company: string;

    @ApiProperty({
        description: '设计单位'
    })
    design_company: string;

    @ApiProperty({
        description: '项目概况'
    })
    project_general: string;

    @ApiProperty({
        description: '投资额'
    })
    project_investment: string;

    @ApiProperty({
        description: '工程类别'
    })
    project_type: ProjectType;

    @ApiProperty({
        description: '投资规模'
    })
    invest_scale: InvestmentScale;
}