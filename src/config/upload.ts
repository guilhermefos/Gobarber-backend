import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'
import path from 'path'

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUPload {
  driver: 's3' | 'disk';

  tempFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine
  }

  config: {
    disk: {};
    aws: {
      bucket: string;
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const hash = crypto.randomBytes(10).toString('HEX')
        const filename = `${hash}-${file.originalname}`

        return callback(null, filename)
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-gdv'
    }
  }
}