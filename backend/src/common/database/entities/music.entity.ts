import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";
import {ManyToMany} from "typeorm";

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fileName: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @ManyToOne(() => User, (user) => user.loadedMusic)
  authorId!: User;

  @ManyToMany(() => User, (user) => user.likedMusic)
  @JoinTable()
  usersThatLiked:User[]
}
