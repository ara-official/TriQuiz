import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    
    MulterModule.register({
      dest: './uploads',
    }),
    FilesModule
  ],
  controllers: [AppController, ImageController],
  providers: [AppService , ImageService],
})
export class AppModule {}
