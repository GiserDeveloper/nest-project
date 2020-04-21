import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, RelationId} from "typeorm";
import {Role} from './Role';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @Column()
    description: string;

    @ManyToOne(type=>Role, role=>role.users,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    role: Role;

    @RelationId((user: User) => user.role)
    roleId: number;
}
