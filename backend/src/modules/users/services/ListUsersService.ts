import { inject, injectable } from 'tsyringe';

import { IUser } from '../interface/IUser';
import { IUsersRepository } from '../interface/IUsersRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();
    return users;
  }
}

export default ListUsersService;
