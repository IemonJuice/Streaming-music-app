import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MusicCatalogModule } from './music-catalog/music-catalog.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, MusicCatalogModule, UsersModule],
})
export class ModulesModule {}
