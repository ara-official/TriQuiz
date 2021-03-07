import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


// Allow only images
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(
            new HttpException(
                'Only image files are allowed!',
                HttpStatus.BAD_REQUEST,
            ),
            false,
        );
    }
    callback(null, true);
};

export const editFileName = async function (req, file, callback) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    var testFolder = '../image_upload/';
    var fs = require('fs');
    
    var hash = 1;
    var randomName;
    for (let i = 0; i < name.length; i++) {
        hash = hash * 27 + name[i];
    }
    randomName = Array(5)
            .fill(null)
            .map(() => Math.round(Math.random() * 10).toString(10))
            .join('');

    callback(null, `${hash}${randomName}${fileExtName}`);
};
export const storeDirectory = async function (req, file, callback) {
    var testFolder = './image_upload/';
    var fs = require('fs');
    var folder_index = 10000;
    var max_file_num = 10000;
    fs.exists(testFolder + 'folderinfo.txt', function (exists) {
        if (exists) {
            fs.readFile(testFolder + 'folderinfo.txt', 'utf8', function (err, data) {
                console.log(data);
                folder_index = data;
            });
        }
        else {
            fs.writeFile(testFolder + 'folderinfo.txt', '0', 'utf8', function (error) { console.log('write end') });
            folder_index = 10000;
        }
    });
    folder_index = (folder_index - (folder_index % max_file_num)) / max_file_num;
    callback(null, `${testFolder}${folder_index}`);

};