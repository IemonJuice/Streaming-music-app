import {
  Body,
  Controller, FileTypeValidator,
  Get, MaxFileSizeValidator, Param, ParseFilePipe,
  Post, Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {MusicCatalogService} from '../services/music-catalog.service';

import {FileInterceptor} from '@nestjs/platform-express';
import {MusicDto} from "../../../common/models/music.dto";
import {Music} from "../../../common/database/entities/music.entity";
import {Response} from "express";
import * as fs from "fs";

@Controller('music-catalog')
export class MusicCatalogController {
  constructor(private musicCatalogService: MusicCatalogService) {
  }

  @Get()
  getAllMusicCatalog(): Promise<Music[]> {
    return this.musicCatalogService.getAllMusic();
  }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize: 1000000}),
        new FileTypeValidator({fileType: 'mp4'}),
      ],
    }),
  ) file: Express.Multer.File, @Body() body: MusicDto) {
    this.musicCatalogService.saveMusic(file);
    return await this.musicCatalogService.addNewMusic(body, file.originalname)
  }

  @Get(':id')
  async getMusicFile(@Param('id') musicId: number, @Res() res: Response) {
    this.musicCatalogService.getMusicFileById(musicId).then((path) => {
      res.sendFile(path);
    })

    return await this.musicCatalogService.getMusicInfoById(musicId)
  }

  @Get('genres/:genre')
  async getMusicWithFilteredGanre(@Param('genre') genre: string) {
    return await this.musicCatalogService.getFilteredMusicByGenre(genre)
  }

}


