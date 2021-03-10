import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  constructor() {}

  async uploadedFile(file: any) {
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: {
        originalname: file.originalname,
        filename: file.filename,
      },
    };
  }

  getImage(image: string, res: any) {
    const response = res.sendFile(image, { root: './image_upload' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
