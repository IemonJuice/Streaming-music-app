import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from '../../../common/database/entities/music.entity';
import * as fs from 'fs'
import * as path from "path";
import {MusicDto} from "../../../common/models/music.dto";
@Injectable()
export class MusicCatalogService {
  constructor(
    @InjectRepository(Music) private musicRepository: Repository<Music>,
  ) {}

  async addNewMusic(musicDto:MusicDto,filename:string) {
    const music:Music = new Music();
    music.author = musicDto.author;
    music.name = musicDto.name;
    music.fileName = filename;
    console.log(filename);
    return await this.musicRepository.save(music)
  }
  saveMusic(file:Express.Multer.File) {
    const currentDirectory = process.cwd();
    const uploadPath = path.join(currentDirectory, 'music');
    const filePath = path.join(uploadPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer);
  }

  getAllMusic():Promise<Music[]> {
    return this.musicRepository.find()
  }
}
