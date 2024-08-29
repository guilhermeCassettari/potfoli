/* eslint-disable no-unused-vars */
import { IUser } from '../interface/IUser';
import { User } from '../entities/User.entity';

export interface IUsersRepository {
  create({ name, email, password, phone, id }: IUser): Promise<IUser>;
  update({ name, email, password, phone, id }: IUser): Promise<void>;
  delete(user: Pick<IUser, 'id'>): Promise<void>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findUniqueUser({
    name,
    email,
    phone,
  }: IUser): Promise<IUser | null>;
  findAll(): Promise<User[]>;
}
