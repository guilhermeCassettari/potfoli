import { Router } from 'express';

import multer from 'multer';
import isAuthenticated from '../../../shared/auth/isAuthenticated';
import ImageController from '../controllers/ImageController';
import AppError from '../../../shared/errors/AppError';

const imageRouter = Router();

const imageControler = new ImageController();
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpg',
      'image/png',
      'image/jpeg',
      'image/svg+xml',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type.'));
    }
  },
});

imageRouter.post(
  '/',
  isAuthenticated,
  upload.single('file'),
  imageControler.create,
);

imageRouter.get('/:name', imageControler.findOne);

imageRouter.delete('/:name', isAuthenticated, imageControler.delete);

export default imageRouter;
