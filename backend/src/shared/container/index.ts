import { container } from 'tsyringe';

import UsersRepository from '../../modules/users/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/users/interface/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
