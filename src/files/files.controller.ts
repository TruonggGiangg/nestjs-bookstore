import { Controller, Post, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus, Delete, Param, HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/decorator/customize';
import * as fs from 'fs';
import * as path from 'path';

@Controller('files')
export class FilesController {
  constructor(
  ) { }



  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ResponseMessage("upload file")
  uploadFile
    (@UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(image\/png|image\/jpe?g)/i,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    ) file: Express.Multer.File) {
    return {
      fileName: file.filename
    }
  }

  @Delete('delete/:folder/:filename')
  @ResponseMessage("delete file")
  async deleteFile(@Param('folder') folder: string, @Param('filename') filename: string) {
    const filePath = path.join(process.cwd(), 'public', 'images', folder, filename);

    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            reject(new HttpException('File not found', HttpStatus.NOT_FOUND));
          } else {
            reject(new HttpException('Error deleting file', HttpStatus.INTERNAL_SERVER_ERROR));
          }
        } else {
          resolve({ message: 'File deleted successfully' });
        }
      });
    });
  }



}
