import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {MusicCatalogService} from '../services/music-catalog.service';

import {FileInterceptor} from '@nestjs/platform-express';
import {MusicDto} from "../../../common/models/music.dto";
import {Music} from "../../../common/database/entities/music.entity";

@Controller('music-catalog')
export class MusicCatalogController {
  constructor(private musicCatalogService: MusicCatalogService) {}

  @Get()
  getAllMusicCatalog():Promise<Music[]> {
    return this.musicCatalogService.getAllMusic();
  }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: MusicDto) {
    this.musicCatalogService.saveMusic(file);
    return await this.musicCatalogService.addNewMusic(body,file.originalname)
  }
}
