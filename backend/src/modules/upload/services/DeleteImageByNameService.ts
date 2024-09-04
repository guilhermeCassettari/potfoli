import { inject, injectable } from 'tsyringe';
import { IUploadImageRepository } from '../interface/IUploadImageRepository';

@injectable()
class DeleteImageByNameService {
  constructor(
    @inject('ImageRepository')
    private imageRepository: IUploadImageRepository,
  ) {}

  public async execute(name: string): Promise<void> {
    await this.imageRepository.delete(name);
  }
}

export default DeleteImageByNameService;
