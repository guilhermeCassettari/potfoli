import { User } from '../entities/User.entity';
import { Like, Repository } from 'typeorm';
import { AppDataSource } from '../../../shared/data-source';
import { IUser } from '../interface/IUser';
import AppError from '../../../shared/errors/AppError';
import { IUsersRepository } from '../interface/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }
  async create({
    name,
    email,
    password,
    phone,
    id,
  }: IUser): Promise<IUser> {
    const user = await this.ormRepository.create({
      name,
      email,
      password,
      phone,
      id,
    });

    await this.ormRepository.save(user);

    return user;
  }
  async update({
    name,
    email,
    password,
    phone,
    id,
  }: IUser): Promise<void> {
    // TODO: Remover if
    if (!id) {
      throw new AppError('Id is Required');
    }
    await this.ormRepository.update(id, {
      name,
      email,
      password,
      phone,
    });

    return Promise.resolve();
  }

  async delete(user: IUser): Promise<void> {
    await this.ormRepository.delete({
      id: user.id,
    });

    return Promise.resolve();
  }

  async deleteTestUser(): Promise<void> {
    await this.ormRepository.delete({
      name: Like('%[test]%'),
    });

    return Promise.resolve();
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  findByEmail(email: string): Promise<IUser | null> {
    const user = this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  async findUniqueUser({
    name,
    email,
    phone,
  }: IUser): Promise<IUser | null> {
    const user = this.ormRepository.findOne({
      where: [{ name }, { email }, { phone }],
    });
    return user;
  }
  async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }
}

export default UsersRepository;
