import { IUploadImage } from './IUploadImage';

export interface IUploadImageRepository {
  create(image: IUploadImage): Promise<IUploadImage>;
  findByName(name: string): Promise<IUploadImage | null>;
  delete(name: string): Promise<void>;
  findAll(): Promise<IUploadImage[]>;
  update(id: string, image: IUploadImage): Promise<void>;
}
