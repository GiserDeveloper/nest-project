import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, CreateDateColumn,UpdateDateColumn} from "typeorm";

export enum ProjectType{
    Road = '公路工程',
    Water = '水利水电',
    Railroad ='铁路工程',
    Municipal ='市政工程',
    Railway ='轨道交通',
    House ='房建工程',
    Others ='其他工程'
}

export enum InvestmentScale{
    Scale1 = '3亿元以下(含3亿)',
    Scale2 = '3~6亿元(含6亿)',
    Scale3 = '6~10亿元(含10亿)',
    Scale4 = '10亿元以上'
}

@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    project_name: string;

    @Column()
    build_pattern: string;

    @Column()
    owner_company: string;

    @Column()
    design_company: string;

    @Column()
    project_general: string;

    @Column()
    project_investment: string;

    @Column({
        comment: '工程类别',
        type: 'enum',
        enum: ProjectType
    })
    project_type: ProjectType

    @Column({
        comment: '投资规模',
        type: 'enum',
        enum: InvestmentScale
    })
    invest_scale: InvestmentScale

    @CreateDateColumn()
    create_time: string

    @UpdateDateColumn()
    update_time: string
}