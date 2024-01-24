import {
  Body,
  Controller, Delete, FileTypeValidator,
  Get, MaxFileSizeValidator, Param, ParseFilePipe,
  Post, Res, StreamableFile,
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
        new MaxFileSizeValidator({maxSize: 10000000000}),
      ],
    }),
  ) file: Express.Multer.File, @Body() body: MusicDto) {
    console.log(body)
    this.musicCatalogService.saveMusic(file);
    return await this.musicCatalogService.addNewMusic(body, file.originalname)
  }

  @Get(':id')
  async getMusicFile(@Param('id') musicId: number, @Res() res: Response): Promise<StreamableFile> {
    const file = fs.createReadStream(await this.musicCatalogService.getMusicFileById(musicId));
    file.on('close', () => {
      res.end();
    });
    file.pipe(res);
    return new StreamableFile(file);
  }

  @Get('genres/:genre')
  async getMusicWithFilteredGanre(@Param('genre') genre: string) {
    return await this.musicCatalogService.getFilteredMusicByGenre(genre)
  }

  @Get('search/:search')
  async getSearchingMusic(@Param('search') musicInfo:string) {
    return await this.musicCatalogService.getMusicInfoBySpecificSearch(musicInfo)
  }
  @Get('info/:id')
  async getMusicInfoById(@Param('id') musicID:number) {
    return await this.musicCatalogService.getMusicInfoById(musicID)
  }
  @Delete(':id')
  async deleteMusic(@Param('id') id:number) {
    return this.musicCatalogService.removeMusicById(id)
  }
}


