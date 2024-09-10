import { Repository } from 'typeorm';
import { HomePage } from '../entities/HomePage.entity';
import { IHomePageRepository } from '../interface/IHomePageRepository';
import { AppDataSource } from '../../../shared/data-source';
import { IPage, ISetHomePage } from '../interface/ISetHomePage';

class PagesRepository implements IHomePageRepository {
  private ormRepository: Repository<HomePage>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(HomePage);
  }

  async setHomePage(page: ISetHomePage): Promise<Response> {
    const { impact_phrase, social_medias } = page.page;

    const newHomePage = this.ormRepository.create({
      impact_phrase,
      social_medias,
    });

    await this.ormRepository.save(newHomePage);
    return new Response(JSON.stringify(newHomePage), {
      status: 201,
    });
  }

  async updateHomePage(id: string, page: IPage): Promise<Response> {
    const { impact_phrase, social_medias } = page;
    const newHomePage = this.ormRepository.create({
      impact_phrase,
      social_medias,
    });
    await this.ormRepository.update(id, newHomePage);
    return new Response(JSON.stringify(newHomePage), {
      status: 201,
    });
  }

  async hasHomePage(): Promise<HomePage[]> {
    const hasHomePage = await this.ormRepository.find();
    return hasHomePage;
  }
}

export default PagesRepository;
