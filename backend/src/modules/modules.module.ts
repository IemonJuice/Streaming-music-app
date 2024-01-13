import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MusicCatalogModule } from './music-catalog/music-catalog.module';

@Module({
  imports: [AuthModule, MusicCatalogModule],
})
export class ModulesModule {}
