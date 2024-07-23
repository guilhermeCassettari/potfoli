import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const users = container.resolve(CreateUserService);
    const createUser = await users.execute();

    return response.json(createUser);
  }

  public async update() {}

  public async delete() {}

  public async show(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const users = container.resolve(CreateUserService);
    const createUser = await users.execute();
    return response.json(createUser);
  }
}
