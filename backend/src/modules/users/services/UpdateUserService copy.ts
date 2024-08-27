import { inject, injectable } from 'tsyringe';

import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import regexPassword from '../../../shared/regexPassword/regexPassword';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    phone,
    id,
  }: IUser): Promise<IUser> {
    if (!name || !email || !password || !phone || !id) {
      throw new AppError(
        'Name, email, password and phone are required',
      );
    }

    regexPassword(password);

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.update({
      name,
      email,
      password,
      phone,
      id,
    });

    const updatedUser = await this.usersRepository.findById(id);

    if (!updatedUser) {
      throw new AppError('Error during update user.');
    }

    return updatedUser;
  }
}

export default UpdateUserService;
