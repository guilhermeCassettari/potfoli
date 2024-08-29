import { Repository } from 'typeorm';
import { IUserTokenRepository } from '../interface/IUserTokenRepository';
import { AppDataSource } from '../../../shared/data-source';
import UserToken from '../entities/UserToken.entity';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return userToken || null;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
