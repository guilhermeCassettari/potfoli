import UserToken from '../entities/UserToken.entity';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<UserToken | null>;
  generate(user_id: string): Promise<UserToken>;
}
