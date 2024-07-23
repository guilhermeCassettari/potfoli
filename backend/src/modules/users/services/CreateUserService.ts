import { inject, injectable } from 'tsyringe';

import { IUser } from '../entities/IUser';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();
    return users;
  }
}

export default CreateUserService;
