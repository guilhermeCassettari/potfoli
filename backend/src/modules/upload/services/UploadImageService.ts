import { inject, injectable } from 'tsyringe';
import { IUploadImageRepository } from '../interface/IUploadImageRepository';
import { IUploadImage } from '../interface/IUploadImage';
import AppError from '../../../shared/errors/AppError';

@injectable()
class UploadImageService {
  constructor(
    @inject('ImageRepository')
    private imageRepository: IUploadImageRepository,
  ) {}

  async execute({
    name,
    mimetype,
    data,
  }: IUploadImage): Promise<void> {
    if (!name || !mimetype || !data) {
      throw new AppError('Name, mimetype and data are required');
    }
    await this.imageRepository.create({
      name,
      mimetype,
      data,
    });

    return;
  }
}

export default UploadImageService;
