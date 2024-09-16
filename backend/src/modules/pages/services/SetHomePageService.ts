import { inject, injectable } from 'tsyringe';

import PagesRepository from '../repositories/PagesRepository';
import AppError from '../../../shared/errors/AppError';
import { IUploadImageRepository } from '../../upload/interface/IUploadImageRepository';
import { ISetHomePage } from '../interface/ISetHomePage';

@injectable()
export default class SetHomePageService {
  constructor(
    @inject('PagesRepository')
    private pageRepository: PagesRepository,

    @inject('ImageRepository')
    private imageRepository: IUploadImageRepository,
  ) {}

  public async execute({
    page,
    image,
  }: ISetHomePage): Promise<Response> {
    const { impact_phrase, social_medias } = page;
    if (!impact_phrase || !social_medias) {
      throw new AppError(
        'impact_phrase and social_medias are required',
      );
    }

    if (image) {
      const hasImage =
        await this.imageRepository.findByName('home_page');
      if (hasImage && hasImage.id) {
        await this.imageRepository.update(hasImage.id, {
          name: 'home_page',
          mimetype: image.mimetype,
          data: image,
        });
      } else {
        await this.imageRepository.create({
          name: 'home_page',
          mimetype: image.mimetype,
          data: image,
        });
      }
    }

    const hasHomePage = await this.pageRepository.hasHomePage();

    if (hasHomePage[0]) {
      const updatedHomePage =
        await this.pageRepository.updateHomePage(
          hasHomePage[0].id,
          page,
        );

      return updatedHomePage;
    }

    const newHomePage = await this.pageRepository.setHomePage({
      page: { impact_phrase, social_medias },
    });

    return newHomePage;
  }
}
