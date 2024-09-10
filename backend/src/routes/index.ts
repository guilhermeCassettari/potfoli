import { Router } from 'express';
import usersRouter from '../modules/users/routes/user.routes';
import imageRouter from '../modules/upload/routes/image.routes';
import pagesRouter from '../modules/pages/routes/pages.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/image', imageRouter);
routes.use('/pages', pagesRouter);

export default routes;
