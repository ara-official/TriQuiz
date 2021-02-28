import { Module } from '@nestjs/common';
import { ImageController } from '../image/Image.controller';

@Module({
  controllers: [ImageController]
})
export class FilesModule {}