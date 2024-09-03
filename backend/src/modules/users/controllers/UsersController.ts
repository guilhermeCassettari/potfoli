import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';
import CreateSessionService from '../services/CreateSessionService';

export default class UsersController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password, phone } = request.body;
    const users = container.resolve(CreateUserService);
    const createUser = await users.execute({
      name,
      email,
      password,
      phone,
    });

    return response.json(createUser);
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user = container.resolve(UpdateUserService);

    const updatedUser = await user.execute({
      id: request.body.id,
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      phone: request.body.phone,
    });

    return response.json(updatedUser);
  }

  public async delete(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user = container.resolve(DeleteUserService);
    await user.execute({
      id: request.body.id,
    });

    return response.json({
      message: 'User deleted',
    });
  }

  public async deleteUserTest(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user = container.resolve(DeleteUserService);
    await user.deleteTest();

    return response.json({
      message: 'User deleted',
    });
  }

  public async show(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const users = container.resolve(ListUsersService);
    const listUser = await users.execute();

    return response.json(listUser);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const users = container.resolve(ListUsersService);
    const listUser = await users.execute();

    return response.json(listUser);
  }

  public async login(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email, password } = request.body;

    const users = container.resolve(CreateSessionService);

    const user = await users.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
