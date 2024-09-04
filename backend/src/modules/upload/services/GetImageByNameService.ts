import { inject, injectable } from 'tsyringe';
import { IUploadImage } from '../interface/IUploadImage';
import { IUploadImageRepository } from '../interface/IUploadImageRepository';

@injectable()
class GetImageByNameService {
  constructor(
    @inject('ImageRepository')
    private imageRepository: IUploadImageRepository,
  ) {}

  async execute(name: string): Promise<IUploadImage | null> {
    const image = await this.imageRepository.findByName(name);
    return Promise.resolve(image || null);
  }
}

export default GetImageByNameService;
