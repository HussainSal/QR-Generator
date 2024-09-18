import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import {IsEmail} from "class-validator"


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;
    
    @Column()
    @IsEmail()
    email:string;
    
    @Column()
    password:string;

    @Column()
    avatar:string;


}