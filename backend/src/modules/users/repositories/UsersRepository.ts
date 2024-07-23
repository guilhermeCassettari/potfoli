import { IUsersRepository } from './IUsersRepository';
import { User } from '../../entity/User';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../shared/data-source';
import { IUser } from '../entities/IUser';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }
  async create({
    name = 'name',
    email = 'email',
    password = 'password',
    phone = 123,
  }: IUser): Promise<void> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      phone,
    });

    await this.ormRepository.save(user);
  }
  update(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  show(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByEmail(): Promise<void> {
    throw new Error('Method not implemented.');
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
