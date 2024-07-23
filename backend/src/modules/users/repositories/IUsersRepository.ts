import { IUser } from '../entities/IUser';
import User from '../entities/UserEntity';

export interface IUsersRepository {
  create({ name, email, password, phone }: IUser): Promise<void>;
  update(): Promise<void>;
  delete(): Promise<void>;
  show(): Promise<void>;
  findById(): Promise<void>;
  findByEmail(): Promise<void>;
  findAll(): Promise<User[]>;
  saveUser(): Promise<void>;
}
