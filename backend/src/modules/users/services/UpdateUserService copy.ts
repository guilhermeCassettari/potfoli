import { inject, injectable } from 'tsyringe';

import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import regexPassword from '../../../shared/regexPassword/regexPassword';
import phoneValidate from '../shared/PhoneValidate';
import { hashPassword } from '../../../shared/brypt/bcrypt';

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

    const validPhone = phoneValidate(phone);

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const isUniqueUser = await this.usersRepository.findUniqueUser({
      email,
      name,
      phone: validPhone,
    });

    if (isUniqueUser && isUniqueUser.id !== id) {
      throw new AppError('User already exists.');
    }

    await this.usersRepository.update({
      name,
      email,
      password: hashPassword(password),
      phone: validPhone,
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
