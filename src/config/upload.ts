import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  directory: path.resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: tempFolder,
    filename (request, file, callback) {
      const hash = crypto.randomBytes(10).toString('HEX')
      const filename = `${hash}-${file.originalname}`

      return callback(null, filename)
    }
  })
}