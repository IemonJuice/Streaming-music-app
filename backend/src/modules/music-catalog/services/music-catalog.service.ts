import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Music} from '../../../common/database/entities/music.entity';
import * as fs from 'fs'
import * as path from "path";
import {MusicDto} from "../../../common/models/music.dto";
import {User} from "../../../common/database/entities/user.entity";

@Injectable()
export class MusicCatalogService {
  constructor(@InjectRepository(Music) private musicRepository: Repository<Music>, @InjectRepository(User) private userRepository:Repository<User>) {
  }

  async addNewMusic(musicDto: MusicDto, filename: string) {
    const music: Music = new Music();
    music.author = musicDto.author;
    music.name = musicDto.name;
    music.fileName = filename;
    music.genre = musicDto.genre;
    const user = await this.userRepository.findOne({
      where:{
        id:musicDto.id
      }
    })

    if(user){
      music.authorId = user
    }
    return await this.musicRepository.save(music)
  }

  saveMusic(file: Express.Multer.File) {
    const currentDirectory = process.cwd();
    const uploadPath = path.join(currentDirectory, 'music');
    const filePath = path.join(uploadPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
  }

  getAllMusic(): Promise<Music[]> {
    return this.musicRepository.find()
  }

  async getMusicFileById(musicId: number): Promise<string> {
    const music = await this.getMusicInfoById(musicId)
    const currentDirectory = process.cwd();
    const uploadPath = path.join(currentDirectory, 'music');
    return path.join(uploadPath, music.fileName);
  }

  getMusicInfoById(musicId: number) {
    return this.musicRepository.findOne({where: {id: musicId}})
  }

  async getFilteredMusicByGenre(genre: string) {
    return await this.musicRepository.createQueryBuilder('music')
      .select()
      .where('music.genre = :genre', {genre: genre})
      .getMany()
  }

  async getMusicInfoBySpecificSearch(musicInfo:string) {
    return this.musicRepository.createQueryBuilder('music')
      .select()
      .where('music.author = :searchingField', {
        searchingField: musicInfo,
      })
      .orWhere('music.name LIKE :searchingField', {
        searchingField: `%${musicInfo}%`,
      })
      .getMany()
  }

  async removeMusicById(id: number) {
    const music = await this.musicRepository.findOne({
      where:{
        id:id
      }
    })
    const path = await this.getMusicFileById(id)
    fs.unlink(path,(err) => {
      console.log(err);
    })
    return this.musicRepository.remove(music)
  }
}
