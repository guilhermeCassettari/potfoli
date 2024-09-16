import { inject, injectable } from 'tsyringe';
import PagesRepository from '../repositories/PagesRepository';
import { IHomePage } from '../interface/IHomePage';
import { IUploadImageRepository } from '../../upload/interface/IUploadImageRepository';
import AppError from '../../../shared/errors/AppError';

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

    if (!homePageImage) {
      throw new AppError('Image not found');
    }

    const imageParse = JSON.parse(homePageImage.data);
    const imageBufferData = imageParse.buffer.data;

    const imageBase64 =
      Buffer.from(imageBufferData).toString('base64');

    const srcImage = `data:image/jpeg;base64,${imageBase64}`;
    return { srcImage, ...homePage };
  }
}
