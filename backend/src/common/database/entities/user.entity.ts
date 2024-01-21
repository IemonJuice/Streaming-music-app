import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Music} from "./music.entity";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number

  @Column({nullable:false})
  firstName: string;

  @Column({nullable:false})
  username:string

  @Column({nullable:false})
  dateOfRegistration: Date;

  @Column({nullable:false})
  password:string;

  @Column({nullable:false})
  email:string;

  @OneToMany(() => Music, (music) => music.author,{nullable:true})
  loadedMusic:Music[]
}
