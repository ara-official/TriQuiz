import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
let fs = require('fs');
let testFolder = './image_upload/';

export const imageFileFilter = async function (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    throw callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }

  callback(null, true);
};

export const editFileName = async function (
  req: any,
  file: any,
  callback: any,
) {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const crypto = require('crypto');
  let hash = crypto.createHash('sha256').update(name).digest('base64');

  hash = hash.replace(/\\/g, '');
  hash = regExp(hash);
  let randomName = Array(5)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');

  while (true) {
    let path = `${testFolder}${hash}${randomName}${fileExtName}`;
    if (await fs.existsSync(path)) {
      randomName = Array(5)
        .fill(null)
        .map(() => Math.round(Math.random() * 10).toString(10))
        .join('');
    } else {
      break;
    }
  }
  callback(null, `${hash}${randomName}${fileExtName}`);
};

function regExp(str) {
  let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  if (reg.test(str)) {
    return str.replace(reg, '');
  }

  return str;
}
