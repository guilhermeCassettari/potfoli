import { IUsersRepository } from './IUsersRepository';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../shared/data-source';
import { IUser } from '../entities/IUser';
import AppError from '../../../shared/errors/AppError';

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
  }: IUser): Promise<IUser> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      phone,
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

  delete(user: IUser): Promise<void> {
    this.ormRepository.delete({
      id: user.id,
    });

    return Promise.resolve();
  }

  show(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<IUser | null> {
    const user = this.ormRepository.findOne({
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
  saveUser(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default UsersRepository;
