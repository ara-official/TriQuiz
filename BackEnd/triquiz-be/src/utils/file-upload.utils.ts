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
    /*
   
    const iv = randomBytes(16);
    const password = 'Password used to generate key';

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = fileExtName;
    const encryptedText = Buffer.concat([
        cipher.update(textToEncrypt),
        cipher.final(),
    ]);
    */
    var hash = 1;
    var randomName;
    for (let i = 0; i < name.length; i++) {
        hash = hash * 27 + name[i];
    }
    randomName = Array(5)
            .fill(null)
            .map(() => Math.round(Math.random() * 10).toString(10))
            .join('');

    /*
    while (true) {
        var file_exist=1;
        randomName = Array(5)
            .fill(null)
            .map(() => Math.round(Math.random() * 10).toString(10))
            .join('');

        fs.exists(testFolder+`${hash}${randomName}${fileExtName}`, function (exists) {
            if (!exists) {
                console.log("uniq");
                file_exist=0;
            }
        });
        console.log(testFolder + `${hash}${randomName}${fileExtName}`);
        console.log(file_exist);
        if(file_exist==0)
        {
            break;
        }
    }
    */
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