import { inject, injectable } from 'tsyringe';

import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import regexPassword from '../../../shared/regexPassword/regexPassword';
import phoneValidate from '../shared/PhoneValidate';
import { uuid } from '../../../shared/uuid/uuid';
import { hashPassword } from '../../../shared/brypt/bcrypt';

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

    const validPhone = phoneValidate(phone);

    const isUniqueUser = await this.usersRepository.findUniqueUser({
      email,
      name,
      phone: validPhone,
    });

    if (isUniqueUser) {
      throw new AppError('User already exists.');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword(password),
      phone: validPhone,
      id: uuid(),
    });

    return user;
  }
}

export default CreateUserService;