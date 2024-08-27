import { inject, injectable } from 'tsyringe';

import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: Pick<IUser, 'id'>): Promise<void> {
    if (!id) {
      throw new AppError('Id is Required');
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.delete(user);

    return Promise.resolve();
  }
}

export default DeleteUserService;
