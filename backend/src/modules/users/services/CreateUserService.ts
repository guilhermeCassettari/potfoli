import { inject, injectable } from 'tsyringe';

import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import regexPassword from '../../../shared/regexPassword/regexPassword';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    phone,
  }: IUser): Promise<IUser> {
    if (!name || !email || !password || !phone) {
      throw new AppError(
        'Name, email, password and phone are required',
      );
    }

    regexPassword(password);

    const isUniqueUser = await this.usersRepository.findUniqueUser({
      email,
      name,
      phone,
    });

    if (isUniqueUser) {
      throw new AppError('User already exists.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
      phone,
    });

    return user;
  }
}

export default CreateUserService;
