import { Router } from 'express';
import PagesController from '../controllers/PagesController';
import isAuthenticated from '../../../shared/auth/isAuthenticated';
import multer from 'multer';

const pagesRouter = Router();
const pagesController = new PagesController();
const upload = multer();

pagesRouter.get('/home', pagesController.getHomePage);

pagesRouter.post(
  '/home',
  upload.single('file'),
  isAuthenticated,
  pagesController.setHomePage,
);

export default pagesRouter;
