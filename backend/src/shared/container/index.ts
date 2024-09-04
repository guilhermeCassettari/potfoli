import { container } from 'tsyringe';

import UsersRepository from '../../modules/users/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/users/interface/IUsersRepository';

import { IUploadImageRepository } from '../../modules/upload/interface/IUploadImageRepository';
import ImageRepository from '../../modules/upload/repositories/UploadImageReository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUploadImageRepository>(
  'ImageRepository',
  ImageRepository,
);
