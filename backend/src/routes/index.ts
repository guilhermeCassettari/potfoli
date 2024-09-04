import { Router } from 'express';
import usersRouter from '../modules/users/routes/user.routes';
import imageRouter from '../modules/upload/routes/image.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/image', imageRouter);

export default routes;
