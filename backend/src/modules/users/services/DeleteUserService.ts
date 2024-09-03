import { inject, injectable } from 'tsyringe';

import { IUser } from '../interface/IUser';

import AppError from '../../../shared/errors/AppError';
import { IUsersRepository } from '../interface/IUsersRepository';

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

  public async deleteTest(): Promise<void> {
    await this.usersRepository.deleteTestUser();
  }
}

export default DeleteUserService;
