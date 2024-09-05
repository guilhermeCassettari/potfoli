import { Repository } from 'typeorm';

import { UploadImage } from '../entities/UploadImage.entity';
import { AppDataSource } from '../../../shared/data-source';
import { IUploadImageRepository } from '../interface/IUploadImageRepository';
import { IUploadImage } from '../interface/IUploadImage';

class ImageRepository implements IUploadImageRepository {
  private ormRepository: Repository<UploadImage>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UploadImage);
  }

  async create({
    name,
    mimetype,
    data,
  }: IUploadImage): Promise<IUploadImage> {
    const image = this.ormRepository.create({ name, mimetype, data });
    await this.ormRepository.save(image);
    return image;
  }

  async findByName(name: string): Promise<IUploadImage | null> {
    const image = await this.ormRepository.findOneBy({ name });
    return Promise.resolve(image || null);
  }

  async findAll(): Promise<IUploadImage[]> {
    const images = await this.ormRepository.find();
    return Promise.resolve(images);
  }

  async delete(name: string): Promise<void> {
    await this.ormRepository.delete({ name });
    return Promise.resolve();
  }
}

export default ImageRepository;