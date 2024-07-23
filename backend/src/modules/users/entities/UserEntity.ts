import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from './IUser';

@Entity('users')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;
}

export default User;
