import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file: File;
      files: File[];
      user?: Account;
    }
  }
}

//TODO: này như e cài thiếu type của multer thui ko cần phải define lại
