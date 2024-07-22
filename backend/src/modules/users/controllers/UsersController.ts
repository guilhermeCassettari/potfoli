import { Request, Response } from 'express';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return response.json({ message: 'Rola' });
  }

  public async update() {}

  public async delete() {}

  public async show(
    request: Request,
    response: Response,
  ): Promise<Response> {
    return response.json({ message: 'get Users' });
  }
}
