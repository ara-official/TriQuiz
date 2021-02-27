import { Test, TestingModule } from '@nestjs/testing';
import { ImageSendController } from './image-send.controller';

describe('ImageSendController', () => {
  let controller: ImageSendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageSendController],
    }).compile();

    controller = module.get<ImageSendController>(ImageSendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
