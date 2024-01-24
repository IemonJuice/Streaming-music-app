import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user.entity";

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
}
