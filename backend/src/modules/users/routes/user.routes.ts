import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/auth/isAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.findAll);

usersRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    }),
  }),
  usersController.create,
);

usersRouter.patch(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    }),
  }),
  usersController.update,
);

usersRouter.delete(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  usersController.delete,
);

usersRouter.delete(
  '/test',
  isAuthenticated,
  usersController.deleteUserTest,
);

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  usersController.login,
);

usersRouter.get(
  '/isAuthenticated',
  isAuthenticated,
  (req, res, next) => {
    res.status(200).json({ user: req.user });
  }
);

export default usersRouter;
