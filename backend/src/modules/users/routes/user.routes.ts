import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();
usersRouter.get('/', usersController.show);

usersRouter.post('/', (request, response) => {
  return response.json({ message: 'Create!' });
});

usersRouter.patch('/', (request, response) => {
  return response.json({ message: 'Update!' });
});

usersRouter.delete('/', (request, response) => {
  return response.json({ message: 'Delete!' });
});

export default usersRouter;
