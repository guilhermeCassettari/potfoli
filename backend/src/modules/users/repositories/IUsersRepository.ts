import { IUser } from '../entities/IUser';
import User from '../entities/UserEntity';

export interface IUsersRepository {
  create({ name, email, password, phone }: IUser): Promise<IUser>;
  update({ name, email, password, phone, id }: IUser): Promise<void>;
  delete(user: Pick<IUser, 'id'>): Promise<void>;
  show(): Promise<void>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findUniqueUser({
    name,
    email,
    phone,
  }: IUser): Promise<IUser | null>;
  findAll(): Promise<User[]>;
  saveUser(): Promise<void>;
}
