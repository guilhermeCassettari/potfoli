import { container } from 'tsyringe';

import UsersRepository from '../../modules/users/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/users/interface/IUsersRepository';

import { IUploadImageRepository } from '../../modules/upload/interface/IUploadImageRepository';
import ImageRepository from '../../modules/upload/repositories/UploadImageReository';
import { IHomePageRepository } from '../../modules/pages/interface/IHomePageRepository';
import PagesRepository from '../../modules/pages/repositories/PagesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUploadImageRepository>(
  'ImageRepository',
  ImageRepository,
);

container.registerSingleton<IHomePageRepository>(
  'PagesRepository',
  PagesRepository,
);
