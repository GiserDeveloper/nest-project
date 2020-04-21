import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import {User} from './User';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        length:50,
        unique:true
    })
    roleName:string;

    // type指定User 
    //第二個参数是function预设传入第一个参数的type
    //这个属性不会存到数据库
    @OneToMany(type=>User,user=>user.role)
    users: [];
}
