import { container } from 'tsyringe';

import { Request, Response } from 'express';
import UploadImageService from '../services/UploadImageService';
import GetImageByNameService from '../services/GetImageByNameService';
import DeleteImageByNameService from '../services/DeleteImageByNameService';

export default class ImageController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const uploadImage = container.resolve(UploadImageService);

    const { originalname, mimetype, buffer } = request.file!;

    const image = await uploadImage.execute({
      name: originalname,
      mimetype,
      data: `${buffer}`,
    });

    return response.json(image);
  }

  public async findOne(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const findImage = container.resolve(GetImageByNameService);
    const { name } = request.params;

    const image = await findImage.execute(name);
    return response.json(image);
  }

  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const deleteImage = container.resolve(DeleteImageByNameService);

    const { name } = request.params;
    await deleteImage.execute(name);
    return response.json({ message: 'Image deleted' });
  }
}
