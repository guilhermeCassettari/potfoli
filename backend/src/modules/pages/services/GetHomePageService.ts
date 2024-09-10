import { inject, injectable } from 'tsyringe';
import PagesRepository from '../repositories/PagesRepository';
import { IHomePage } from '../interface/IHomePage';
import { IUploadImageRepository } from '../../upload/interface/IUploadImageRepository';

@injectable()
export default class GetHomePageService {
  constructor(
    @inject('PagesRepository')
    private pageRepository: PagesRepository,

    @inject('ImageRepository')
    private imageRepository: IUploadImageRepository,
  ) {}

  public async execute(): Promise<IHomePage> {
    const homePage = await this.pageRepository.getHomePage();

    const homePageImage =
      await this.imageRepository.findByName('home_page');
    return { image: homePageImage, ...homePage };
  }
}
