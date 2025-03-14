import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from "multer";
import { join } from "path";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    getRootPath = () => {
        return process.cwd();
    };
    ensureExists(targetDirectory: string) {
        fs.mkdir(targetDirectory, { recursive: true }, (error) => {
            if (!error) {
                console.log('Directory successfully created, or it already exists.');
                return;
            }
            switch (error.code) {
                case 'EEXIST':
                    break;
                case 'ENOTDIR':
                    break;
                default:
                    console.error(error);
                    break;
            }
        });
    }

    //dinh nghia noi luu tru va tên file
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const folder = req?.headers?.folder_type ?? "default";
                    this.ensureExists(`public/images/${folder}`);
                    cb(null, join(this.getRootPath(), `public/images/${folder}`))
                },
                filename: (req, file, cb) => {
                    let extName = path.extname(file.originalname);
                    let baseName = path.basename(file.originalname, extName);
                    let finalName = `${baseName}-${Date.now()}${extName}`
                    cb(null, finalName)
                }
            })
        };
    }
}