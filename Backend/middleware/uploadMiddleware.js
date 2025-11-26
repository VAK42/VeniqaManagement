import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import config from '../config/config.js';
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploads.directory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
export default upload;