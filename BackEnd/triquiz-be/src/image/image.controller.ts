import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './image_upload',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadedFile(@UploadedFile() file: any) {
    return this.imageService.uploadedFile(file);
  }

  @Get(':imagename')
  getImage(@Param('imagename') image: string, @Res() res: any) {
    return this.imageService.getImage(image, res);
  }
}
