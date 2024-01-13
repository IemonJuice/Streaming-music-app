import { Module } from '@nestjs/common';
import { ConfigModule as ConfigNestModule } from '@nestjs/config';
import { typeOrmModuleAsyncOptions } from './configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigNestModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
  ],
})
export class ConfigModule {}
