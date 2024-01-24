import { Module } from '@nestjs/common';
import { MusicCatalogController } from './controllers/music-catalog.controller';
import { MusicCatalogService } from './services/music-catalog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from '../../common/database/entities/music.entity';
import {User} from "../../common/database/entities/user.entity";

@Module({
  controllers: [MusicCatalogController],
  imports: [TypeOrmModule.forFeature([Music,User])],
  providers: [MusicCatalogService],
})
export class MusicCatalogModule {}
