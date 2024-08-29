import { inject, injectable } from 'tsyringe';
import { comparePassword } from '../../../shared/brypt/bcrypt';
import AppError from '../../../shared/errors/AppError';

import { IUser } from '../interface/IUser';
import { GetEnv } from '../../../shared/getEnv/GetEnv';
import { IUserToken } from '../interface/IUserToken';
import { IUsersRepository } from '../interface/IUsersRepository';
import { sign } from 'jsonwebtoken';

const getEnv = new GetEnv();
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: Pick<IUser, 'email' | 'password'>): Promise<IUserToken> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.password || !password) {
      throw new AppError(
        'Incorrect email/password combination1',
        401,
      );
    }
    console.log(user.password);
    console.log(password);

    const passwordConfirmed = comparePassword(
      password,
      user.password,
    );

    console.log(passwordConfirmed);

    if (!passwordConfirmed) {
      throw new AppError(
        'Incorrect email/password combination2',
        401,
      );
    }

    const token = sign({}, getEnv.jwtSecret || 'default', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
