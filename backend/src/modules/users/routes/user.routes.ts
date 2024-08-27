import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', usersController.findAll);

usersRouter.post(
  '/',
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
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
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
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  usersController.delete,
);

export default usersRouter;
